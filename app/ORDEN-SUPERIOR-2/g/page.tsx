"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface Point {
  x: number;
  y: number;
}

interface ChartProps {
  data: Point[];
  title: string;
  point?: Point;
  yLabel: string;
}

const ordenSuperiorEjercicio11 = () => {
  const solutionData: Point[] = Array.from({ length: 100 }, (_, i) => {
    const x = i / 10;
    // y = c₁ + c₂e^(-6x) + c₃e^(-2x)
    // y(0) = 0, y'(0) = 1, y''(0) = -7
    const c1 = -1/20;
    const c2 = -1/10;
    const c3 = 1/4;
    const y = c1 + c2*Math.exp(-6*x) + c3*Math.exp(-2*x);
    return { x, y };
  });

  const derivativeData: Point[] = Array.from({ length: 100 }, (_, i) => {
    const x = i / 10;
    // const c1 = -1/20;
    const c2 = -1/10;
    const c3 = 1/4;
    const yPrime = -6*c2*Math.exp(-6*x) - 2*c3*Math.exp(-2*x);
    return { x, y: yPrime };
  });

  const Chart: React.FC<ChartProps> = ({ data, title, point, yLabel }) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="x"
                type="number"
                label={{ value: 'x', position: 'bottom' }}
                domain={['auto', 'auto']}
                stroke="#6b7280"
              />
              <YAxis
                label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
                domain={['auto', 'auto']}
                stroke="#6b7280"
              />
              <Tooltip
                formatter={(value: number) => value.toFixed(3)}
                labelFormatter={(value: number) => `x = ${value.toFixed(2)}`}
                contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              {point && (
                <Line
                  data={[point]}
                  type="monotone"
                  dataKey="y"
                  stroke="#ef4444"
                  strokeWidth={0}
                  dot={{ stroke: '#ef4444', strokeWidth: 2, r: 6, fill: '#fff' }}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const steps = [
    {
      title: "Ecuación Diferencial",
      content: [
        {
          text: "Ecuación diferencial de tercer orden homogénea:",
          math: "y''' + 12y'' + 36y' = 0"
        }
      ]
    },
    {
      title: "Solución de la Ecuación",
      content: [
        {
          text: "Ecuación característica:",
          math: "r^3 + 12r^2 + 36r = 0"
        },
        {
          text: "Factorizando:",
          math: [
            "r(r^2 + 12r + 36) = 0",
            "r(r + 6)(r + 6) = 0",
            "r = 0, r = -6 \\text{ (doble)}"
          ]
        },
        {
          text: "Por lo tanto, la solución general es:",
          math: "y = c_1 + c_2e^{-6x} + c_3xe^{-6x}"
        }
      ]
    },
    {
      title: "Condiciones Iniciales",
      content: [
        {
          text: "Aplicando y(0) = 0:",
          math: "c_1 + c_2 = 0"
        },
        {
          text: "Aplicando y'(0) = 1:",
          math: "-6c_2 + c_3 = 1"
        },
        {
          text: "Aplicando y''(0) = -7:",
          math: [
            "36c_2 - 12c_3 = -7"
          ]
        },
        {
          text: "Resolviendo el sistema:",
          math: [
            "c_1 = -\\frac{1}{20}",
            "c_2 = -\\frac{1}{10}",
            "c_3 = \\frac{1}{4}"
          ]
        }
      ]
    },
    {
      title: "Solución Final",
      content: [
        {
          text: "La solución particular es:",
          math: "y = -\\frac{1}{20} - \\frac{1}{10}e^{-6x} + \\frac{1}{4}xe^{-6x}"
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Ecuación Diferencial de Orden Superior
      </h1>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-600">Problema y Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Ecuación Diferencial:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y''' + 12y'' + 36y' = 0"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Condiciones Iniciales:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y(0) = 0, \\quad y'(0) = 1, \\quad y''(0) = -7"}</BlockMath>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart 
          data={solutionData} 
          title="Solución y(x) con punto inicial y(0) = 0" 
          point={{ x: 0, y: 0 }}
          yLabel="y(x)"
        />
        <Chart 
          data={derivativeData} 
          title="Derivada y'(x) con punto inicial y'(0) = 1" 
          point={{ x: 0, y: 1 }}
          yLabel="y'(x)"
        />
      </div>

      <div className="space-y-6 mt-8">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {step.content.map((content, contentIndex) => (
                  <div key={contentIndex} className="space-y-2">
                    {content.text && <p>{content.text}</p>}
                    {content.math && (
                      <div className="p-4 rounded-lg">
                        {Array.isArray(content.math) ? (
                          <div className="space-y-4">
                            {content.math.map((eq, eqIndex) => (
                              <div key={eqIndex} className="flex justify-center">
                                <BlockMath>{eq}</BlockMath>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <BlockMath>{content.math}</BlockMath>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ordenSuperiorEjercicio11;