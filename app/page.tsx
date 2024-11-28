"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Interfaces para los tipos
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

const DifferentialEquationSolution = () => {
  // Datos para la solución principal y = 2 - 2/x²
  const solutionData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: 2 - 2/(x*x)
    };
  });

  // Datos para y'(x) = 4x^(-3)
  const derivativeData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: 4/(x*x*x)
    };
  });

  const point1: Point = { x: 1, y: 0 };
  const point2: Point = { x: 1, y: 4 };

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
          text: "Ecuación diferencial lineal homogénea de segundo orden:",
          math: "x^2y'' + 3xy' = 0"
        },
        {
          text: "Es una ecuación de tipo Euler-Cauchy porque los coeficientes son potencias de x"
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
          text: "Sustituimos en la ecuación original y simplificamos:",
          math: [
            "x^2[r(r-1)x^{r-2}] + 3x[rx^{r-1}] = 0",
            "r(r-1)x^r + 3rx^r = 0",
            "x^r[r(r-1) + 3r] = 0",
            "x^r[r^2 - r + 3r] = 0",
            "x^r[r^2 + 2r] = 0",
            "r(r + 2) = 0"
          ]
        }
      ]
    },
    {
      title: "4. Raíces Características",
      content: [
        {
          text: "De la ecuación característica:",
          math: "r(r + 2) = 0"
        },
        {
          text: "Obtenemos:",
          math: [
            "r_1 = 0",
            "r_2 = -2"
          ]
        }
      ]
    },
    {
      title: "5. Solución General",
      content: [
        {
          text: "La solución general es una combinación lineal:",
          math: [
            "y = C_1x^{r_1} + C_2x^{r_2}",
            "y = C_1x^0 + C_2x^{-2}",
            "y = C_1 + \\frac{C_2}{x^2}"
          ]
        }
      ]
    },
    {
      title: "6. Condiciones Iniciales",
      content: [
        {
          text: "Primera condición:",
          math: "y(1) = 0"
        },
        {
          text: "Nos da la ecuación:",
          math: "0 = C_1 + C_2 \\quad (1)"
        },
        {
          text: "Segunda condición:",
          math: "y'(1) = 4"
        },
        {
          text: "Derivamos y evaluamos:",
          math: [
            "y' = -2C_2x^{-3}",
            "4 = -2C_2",
            "C_2 = -2 \\quad (2)"
          ]
        }
      ]
    },
    {
      title: "7. Solución del Sistema",
      content: [
        {
          text: "De las ecuaciones anteriores:",
          math: [
            "C_2 = -2",
            "C_1 + (-2) = 0",
            "C_1 = 2"
          ]
        }
      ]
    },
    {
      title: "8. Solución Final",
      content: [
        {
          text: "La solución particular es:",
          math: "y = 2 - \\frac{2}{x^2}"
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Solución Detallada: Ecuación Diferencial
      </h1>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-600">Problema y Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Ecuación Diferencial:</h3>
              <div className="p-4 bg-blue-50 rounded-lg flex justify-center">
                <BlockMath>{"x^2y'' + 3xy' = 0"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Condiciones Iniciales:</h3>
              <div className="p-4 bg-blue-50 rounded-lg flex justify-center">
                <BlockMath>{"y(1) = 0, \\quad y'(1) = 4"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Solución Final:</h3>
              <div className="p-4 bg-blue-50 rounded-lg flex justify-center">
                <BlockMath>{"y = 2 - \\frac{2}{x^2}"}</BlockMath>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart 
          data={solutionData} 
          title="Solución y(x) con punto inicial y(1) = 0" 
          point={point1}
          yLabel="y(x)"
        />
        <Chart 
          data={derivativeData} 
          title="Derivada y'(x) con punto inicial y'(1) = 4" 
          point={point2}
          yLabel="y'(x)"
        />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-blue-700">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {step.content.map((content, contentIndex) => (
                  <div key={contentIndex} className="space-y-2">
                    {content.text && <p className="text-gray-700">{content.text}</p>}
                    {content.math && (
                      <div className="p-4 bg-blue-50 rounded-lg">
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

export default DifferentialEquationSolution;