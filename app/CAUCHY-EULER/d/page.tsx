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

interface MathContent {
  text?: string;
  math?: string | string[];
}

interface Step {
  title: string;
  content: MathContent[];
}

const cauchyEulerEjercicio4 = () => {
  // Datos para la solución principal y = C₁x² + C₂x⁻²
  const solutionData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: (25/4)*x*x - (9/4)*x - 4/(x*x)
    };
  });

  // Datos para y'(x) = 25x/2 - 9/4 + 8/x³
  const derivativeData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: (25/2)*x - 9/4 + 8/(x*x*x)
    };
  });

  const point1: Point = { x: 1, y: 5 };
  const point2: Point = { x: 1, y: 3 };

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

  const steps: Step[] = [
    {
      title: "1. Identificación de la Ecuación",
      content: [
        {
          text: "Ecuación diferencial de Euler-Cauchy:",
          math: "x^2y'' - 3xy' + 4y = 0"
        },
        {
          text: "Con condiciones iniciales:",
          math: ["y(1) = 5", "y'(1) = 3"]
        }
      ]
    },
    {
      title: "2. Método de Euler",
      content: [
        {
          text: "Proponemos una solución de la forma:",
          math: "y = x^r"
        },
        {
          text: "Calculamos las derivadas:",
          math: [
            "y = x^r",
            "y' = rx^{r-1}",
            "y'' = r(r-1)x^{r-2}"
          ]
        }
      ]
    },
    {
      title: "3. Sustitución y Simplificación",
      content: [
        {
          text: "Sustituimos en la ecuación original:",
          math: [
            "x^2[r(r-1)x^{r-2}] - 3x[rx^{r-1}] + 4x^r = 0",
            "r(r-1)x^r - 3rx^r + 4x^r = 0",
            "x^r[r^2 - r - 3r + 4] = 0",
            "x^r[r^2 - 4r + 4] = 0",
            "(r - 2)^2 = 0"
          ]
        }
      ]
    },
    {
      title: "4. Raíces Características",
      content: [
        {
          text: "De la ecuación característica:",
          math: "(r - 2)^2 = 0"
        },
        {
          text: "Tenemos una raíz doble:",
          math: "r_1 = r_2 = 2"
        }
      ]
    },
    {
      title: "5. Solución General",
      content: [
        {
          text: "Para una raíz doble, la solución general es:",
          math: [
            "y = C_1x^2 + C_2x^2\\ln(x)"
          ]
        }
      ]
    },
    {
      title: "6. Condiciones Iniciales",
      content: [
        {
          text: "Aplicamos las condiciones iniciales:",
          math: [
            "y(1) = C_1 + 0 = 5",
            "y'(x) = 2C_1x + C_2(2x\\ln(x) + x)",
            "y'(1) = 2C_1 + C_2 = 3"
          ]
        }
      ]
    },
    {
      title: "7. Sistema de Ecuaciones",
      content: [
        {
          text: "Resolvemos el sistema:",
          math: [
            "C_1 = 5",
            "10 + C_2 = 3",
            "C_2 = -7"
          ]
        }
      ]
    },
    {
      title: "8. Solución Final",
      content: [
        {
          text: "La solución particular es:",
          math: "y = 5x^2 - 7x^2\\ln(x)"
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Ecuación de Cauchy-Euler
      </h1>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-600">Problema y Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Ecuación Diferencial:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"x^2y'' - 3xy' + 4y = 0"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Condiciones Iniciales:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y(1) = 5, \\quad y'(1) = 3"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Solución Final:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y = 5x^2 - 7x^2\\ln(x)"}</BlockMath>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart 
          data={solutionData} 
          title="Solución y(x) con punto inicial y(1) = 5" 
          point={point1}
          yLabel="y(x)"
        />
        <Chart 
          data={derivativeData} 
          title="Derivada y'(x) con punto inicial y'(1) = 3" 
          point={point2}
          yLabel="y'(x)"
        />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r">
              <CardTitle className="text-xl text-blue-700">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {step.content.map((content, contentIndex) => (
                  <div key={contentIndex} className="space-y-2">
                    {content.text && <p className="">{content.text}</p>}
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

export default cauchyEulerEjercicio4;