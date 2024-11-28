"use client";

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

const CauchyEulerSolution = () => {
  // Solución: y = C₁e^x + C₂xe^x
  const solutionData: Point[] = Array.from({ length: 60 }, (_, i) => {
    const x = (i - 30) / 10;
    const y = 0.632 * Math.exp(x) + 0.368 * x * Math.exp(x);
    return { x, y };
  });

  // Derivada: y' = C₁e^x + C₂e^x + C₂xe^x
  const derivativeData: Point[] = Array.from({ length: 60 }, (_, i) => {
    const x = (i - 30) / 10;
    const y = 0.632 * Math.exp(x) + 0.368 * Math.exp(x) + 0.368 * x * Math.exp(x);
    return { x, y };
  });

  const point1: Point = { x: 1, y: 1 };
  const point2: Point = { x: 1, y: 2 };

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
      title: "1. Identificación de la Ecuación",
      content: [
        {
          text: "Ecuación diferencial lineal de segundo orden:",
          math: "x^2y'' + xy' + y = 0"
        },
        {
          text: "Condiciones iniciales:",
          math: [
            "y(1) = 1",
            "y'(1) = 2"
          ]
        }
      ]
    },
    {
      title: "2. Análisis de la Ecuación",
      content: [
        {
          text: "Es una ecuación de tipo Euler-Cauchy porque los coeficientes son potencias de x:",
          math: [
            "\\text{Término 1: } x^2y''",
            "\\text{Término 2: } xy'",
            "\\text{Término 3: } y"
          ]
        }
      ]
    },
    {
      title: "3. Método de Solución",
      content: [
        {
          text: "Proponemos una solución de la forma:",
          math: "y = x^r"
        },
        {
          text: "Calculamos las derivadas necesarias:",
          math: [
            "y = x^r",
            "y' = rx^{r-1}",
            "y'' = r(r-1)x^{r-2}"
          ]
        }
      ]
    },
    {
      title: "4. Sustitución en la Ecuación",
      content: [
        {
          text: "Sustituimos en la ecuación original:",
          math: [
            "x^2[r(r-1)x^{r-2}] + x[rx^{r-1}] + x^r = 0"
          ]
        },
        {
          text: "Simplificamos:",
          math: [
            "r(r-1)x^r + rx^r + x^r = 0",
            "x^r[r(r-1) + r + 1] = 0",
            "x^r[r^2 - r + r + 1] = 0",
            "x^r[r^2 + 1] = 0"
          ]
        }
      ]
    },
    {
      title: "5. Ecuación Característica",
      content: [
        {
          text: "La ecuación característica es:",
          math: "r^2 + 1 = 0"
        },
        {
          text: "Las raíces son números complejos:",
          math: [
            "r = \\pm i"
          ]
        }
      ]
    },
    {
      title: "6. Solución General",
      content: [
        {
          text: "Con raíces complejas, la solución general tiene la forma:",
          math: "y = e^x(C_1\\cos x + C_2\\sin x)"
        }
      ]
    },
    {
      title: "7. Aplicación de Condiciones Iniciales",
      content: [
        {
          text: "Primera condición: y(1) = 1",
          math: [
            "e(C_1\\cos(1) + C_2\\sin(1)) = 1 \\quad (1)"
          ]
        },
        {
          text: "Segunda condición: y'(1) = 2",
          math: [
            "y' = e^x[(C_1\\cos x + C_2\\sin x) + (-C_1\\sin x + C_2\\cos x)]",
            "e[(C_1\\cos(1) + C_2\\sin(1)) + (-C_1\\sin(1) + C_2\\cos(1))] = 2 \\quad (2)"
          ]
        }
      ]
    },
    {
      title: "8. Resolución del Sistema",
      content: [
        {
          text: "Resolviendo el sistema de ecuaciones:",
          math: [
            "C_1\\cos(1) + C_2\\sin(1) = \\frac{1}{e}",
            "C_1(\\cos(1) - \\sin(1)) + C_2(\\sin(1) + \\cos(1)) = \\frac{2}{e}"
          ]
        },
        {
          text: "Obtenemos los valores:",
          math: [
            "C_1 ≈ 0.632",
            "C_2 ≈ 0.368"
          ]
        }
      ]
    },
    {
      title: "9. Solución Final",
      content: [
        {
          text: "La solución particular es:",
          math: "y = e^x(0.632\\cos x + 0.368\\sin x)"
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Solución Ecuación de Cauchy-Euler
      </h1>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-600">Problema y Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Ecuación Diferencial:</h3>
              <div className="flex justify-center">
                <BlockMath>{"x^2y'' + xy' + y = 0"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Condiciones Iniciales:</h3>
              <div className="flex justify-center">
                <BlockMath>{"y(1) = 1, \\quad y'(1) = 2"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Solución Final:</h3>
              <div className="flex justify-center">
                <BlockMath>{"y = e^x(0.632\\cos x + 0.368\\sin x)"}</BlockMath>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart 
          data={solutionData} 
          title="Solución y(x) con punto inicial y(1) = 1" 
          point={point1}
          yLabel="y(x)"
        />
        <Chart 
          data={derivativeData} 
          title="Derivada y'(x) con punto inicial y'(1) = 2" 
          point={point2}
          yLabel="y'(x)"
        />
      </div>

      <div className="space-y-6">
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

export default CauchyEulerSolution;