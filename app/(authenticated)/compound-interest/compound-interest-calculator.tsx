'use client'
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations, Language } from '@/app/translations';
import { useUser } from '@supabase/auth-helpers-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface CompoundInterestState {
  principal: number;
  monthlyInvestment: number;
  time: number;
  rate: number;
  withdrawRate: number;
  compound: string;
}

const compoundOptions = [
  { value: "1", label: 'Annually' },
  { value: "2", label: 'Semi-Annually' },
  { value: "4", label: 'Quarterly' },
  { value: "12", label: 'Monthly' },
  { value: "365", label: 'Daily' },
];

export function CompoundInterestCalculator() {
  const [state, setState] = useState<CompoundInterestState>({
    principal: 10000,
    monthlyInvestment: 100,
    time: 10,
    rate: 5,
    withdrawRate: 3,
    compound: "12",
  });
  const [chartData, setChartData] = useState<any>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language as Language].compoundInterestCalculator;
  const tcommon = translations[language as Language].common;

  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [state, language]);

  const fetchUserData = async () => {
    if (!user) return;

    const response = await fetch(`/api/compound-interest?userId=${user.id}`);
    const data = await response.json();

    if (data) {
      setState(data);
    } else {
      // If no data exists, create a new record
      await updateUserData(state);
    }
  };

  const updateUserData = useCallback(async (newState: CompoundInterestState) => {
    if (!user) return;

    await fetch('/api/compound-interest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        ...newState
      }),
    });
  }, [user]);

  const calculateCompoundInterest = () => {
    let totalAmount = state.principal;
    const totalMonths = state.time * 12;
    const compoundFrequency = Number(state.compound);

    const principalData = [state.principal];
    const compoundData = [0]; // Start with 0 compound interest
    const totalData = [state.principal];

    for (let month = 1; month <= totalMonths; month++) {
      const interestGained = totalAmount * (state.rate / 100 / compoundFrequency) * (compoundFrequency / 12);
      totalAmount = totalAmount + interestGained + state.monthlyInvestment;
      
      if (month % 12 === 0) {
        const principalContribution = state.principal + state.monthlyInvestment * month;
        principalData.push(principalContribution);
        compoundData.push(Number((totalAmount - principalContribution).toFixed(2)));
        totalData.push(Number(totalAmount.toFixed(2)));
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
          label: t.totalContributions,
          data: principalData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          fill: false,
          pointRadius: 2,
        },
        {
          label: t.compoundInterest,
          data: compoundData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235)',
          borderWidth: 1,
          fill: false,
          pointRadius: 2,
        },
        {
          label: tcommon.total,
          data: totalData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          fill: false,
          pointRadius: 2,
        },
      ],
    });
  };

  const handleInputChange = (key: keyof CompoundInterestState, value: number | string) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    updateUserData(newState);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'fr-FR', { 
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
          pointStyle: 'rectRounded',
          padding: 20,
          color: theme === 'light' ? 'black' : 'white',
          font: {
            size: 14
          },
        },
      },
      title: {
        display: true,
        text: t.title,
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
        },
        usePointStyle: true,
        boxPadding: 6,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: tcommon.amount,
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
          text: tcommon.year,
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
    <Card>
        <CardContent className="space-y-6 p-3 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">{t.initialInvestment} (€)</Label>
                <Input
                  id="principal"
                  type="number"
                  value={state.principal}
                  onChange={(e) => handleInputChange('principal', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyInvestment">{t.monthlyInvestment} (€)</Label>
                <Input
                  id="monthlyInvestment"
                  type="number"
                  value={state.monthlyInvestment}
                  onChange={(e) => handleInputChange('monthlyInvestment', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">{t.investmentDuration}</Label>
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
                <Label htmlFor="rate">{t.annualInterestRate}: {state.rate}%</Label>
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
                <Label htmlFor="withdrawRate">{t.withdrawRate}: {state.withdrawRate}%</Label>
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
                <Label htmlFor="compound">{t.compoundFrequency} (per year)</Label>
                <Select value={state.compound} onValueChange={(value) => handleInputChange('compound', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectCompoundFrequency} />
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
                  <h3 className="text-lg font-semibold mb-2">{t.finalAmount}</h3>
                  <p className="text-2xl font-bold">
                    {formatCurrency(finalAmount)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t.monthlyRevenue} ({state.withdrawRate}% {t.withdrawRate})</h3>
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
  );
}