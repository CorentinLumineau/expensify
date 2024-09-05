'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useTheme } from '../contexts/ThemeContext';
import { RootState } from '../store/store';
import { updateState, CompoundInterestState } from '../store/compoundInterestSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const compoundOptions = [
  { value: "1", label: 'Annually' },
  { value: "2", label: 'Semi-Annually' },
  { value: "4", label: 'Quarterly' },
  { value: "12", label: 'Monthly' },
  { value: "365", label: 'Daily' },
];

const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 100000).toFixed(0) + 'k';
  } else {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num);
  }
};

export default function CompoundInterestPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.compoundInterest);
  const [chartData, setChartData] = useState<any>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    calculateCompoundInterest();
  }, [state]);

  const calculateCompoundInterest = () => {
    let totalAmount = state.principal;
    const totalMonths = state.time * 12;
    const compoundFrequency = Number(state.compound);

    const principalData = [state.principal];
    const compoundData = [state.principal];

    for (let month = 1; month <= totalMonths; month++) {
      totalAmount = totalAmount * Math.pow((1 + (state.rate / 100) / compoundFrequency), compoundFrequency / 12) + state.monthlyInvestment;
      if (month % 12 === 0) {
        principalData.push(state.principal + state.monthlyInvestment * month);
        compoundData.push(Number(totalAmount.toFixed(2)));
      }
    }

    setFinalAmount(totalAmount);
    setMonthlyRevenue((totalAmount * (state.withdrawRate / 100)) / 12);

    const currentYear = new Date().getFullYear();
    const labels = Array.from({ length: state.time + 1 }, (_, i) => (currentYear + i).toString());

    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Contributions',
          data: principalData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          fill: true,
          pointRadius: 2,
        },
        {
          label: 'Compound Interest',
          data: compoundData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235)',
          fill: true,
          pointRadius: 2,
        },
      ],
    });
  };

  const handleInputChange = (key: keyof CompoundInterestState, value: number | string) => {
    dispatch(updateState({ [key]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatChartValue = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M €';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'k €';
    } else {
      return value + ' €';
    }
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          color: theme === 'light' ? 'black' : 'white',
          font: {
            size: 14
          },
        },
      },
      title: {
        display: true,
        text: 'Compound Interest Growth',
        color: theme === 'light' ? 'black' : 'white',
        font: {
          size: 18
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatChartValue(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (€)',
          color: theme === 'light' ? 'black' : 'white',
        },
        ticks: {
          color: theme === 'light' ? 'black' : 'white',
          callback: function(value: any) {
            return formatChartValue(value);
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          color: theme === 'light' ? 'black' : 'white',
        },
        ticks: {
          color: theme === 'light' ? 'black' : 'white',
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <Card>
        <CardContent className="space-y-6 p-3 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Initial Investment (€)</Label>
                <Input
                  id="principal"
                  type="number"
                  value={state.principal}
                  onChange={(e) => handleInputChange('principal', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyInvestment">Monthly Investment (€)</Label>
                <Input
                  id="monthlyInvestment"
                  type="number"
                  value={state.monthlyInvestment}
                  onChange={(e) => handleInputChange('monthlyInvestment', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time (years)</Label>
                <Input
                  id="time"
                  type="number"
                  value={state.time}
                  onChange={(e) => handleInputChange('time', Number(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="rate">Annual Interest Rate: {state.rate}%</Label>
                <Slider
                  id="rate"
                  min={0}
                  max={15}
                  step={0.5}
                  value={[state.rate]}
                  onValueChange={(value) => handleInputChange('rate', value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>15%</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="withdrawRate">Withdraw Rate: {state.withdrawRate}%</Label>
                <Slider
                  id="withdrawRate"
                  min={2}
                  max={5}
                  step={0.2}
                  value={[state.withdrawRate]}
                  onValueChange={(value) => handleInputChange('withdrawRate', value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2%</span>
                  <span>5%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="compound">Compound Frequency (per year)</Label>
                <Select value={state.compound} onValueChange={(value) => handleInputChange('compound', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compound frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {compoundOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Final Amount</h3>
                  <p className="text-2xl font-bold">
                    {formatCurrency(finalAmount)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Monthly Revenue (at {state.withdrawRate}% withdraw rate)</h3>
                  <p className="text-2xl font-bold">
                    {formatCurrency(monthlyRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {chartData && (
            <div className="h-[400px] w-full">
              <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}