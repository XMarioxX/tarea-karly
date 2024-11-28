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

const CauchyEulerSolver = () => {
  // Datos para la solución y = 1 + ln(x) - 1/(2x)
  const solutionData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: 1 + Math.log(x) - 1/(2*x)
    };
  });

  // Datos para y'(x) = 1/x - 1/(2x²)
  const derivativeData: Point[] = Array.from({ length: 90 }, (_, i) => {
    const x = (i + 10) / 10;
    return {
      x: x,
      y: 1/x + 1/(2*x*x)
    };
  });

  const point1: Point = { x: 1, y: 1 };
  const point2: Point = { x: 1, y: -0.5 };

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
          text: "Ecuación diferencial de Euler-Cauchy con término no homogéneo:",
          math: "x^2y'' + y' = x"
        },
        {
          text: "Condiciones iniciales:",
          math: [
            "y(1) = 1",
            "y'(1) = -\\frac{1}{2}"
          ]
        }
      ]
    },
    {
      title: "2. Solución de la Ecuación Homogénea",
      content: [
        {
          text: "Primero resolvemos la parte homogénea:",
          math: "x^2y'' + y' = 0"
        },
        {
          text: "Proponemos y = xʳ como solución:",
          math: [
            "y = x^r",
            "y' = rx^{r-1}",
            "y'' = r(r-1)x^{r-2}"
          ]
        },
        {
          text: "Sustituyendo en la ecuación homogénea:",
          math: [
            "x^2[r(r-1)x^{r-2}] + rx^{r-1} = 0",
            "r(r-1)x^r + rx^{r-1} = 0",
            "x^{r-1}[r(r-1)x + r] = 0",
            "r[r-1 + 1] = 0"
          ]
        },
        {
          text: "Obtenemos las raíces características:",
          math: [
            "r = 0",
            "r = 0"
          ]
        },
        {
          text: "Al tener una raíz doble, la solución homogénea es:",
          math: "y_h = C_1 + C_2\\ln(x)"
        }
      ]
    },
    {
      title: "3. Solución Particular",
      content: [
        {
          text: "Para la solución particular, proponemos:",
          math: "y_p = Ax + \\frac{B}{x}"
        },
        {
          text: "Derivando:",
          math: [
            "y_p' = A - \\frac{B}{x^2}",
            "y_p'' = \\frac{2B}{x^3}"
          ]
        },
        {
          text: "Sustituyendo en la ecuación original:",
          math: [
            "x^2(\\frac{2B}{x^3}) + (A - \\frac{B}{x^2}) = x",
            "2B/x + A - \\frac{B}{x^2} = x"
          ]
        },
        {
          text: "Igualando coeficientes:",
          math: [
            "A = 1",
            "B = -\\frac{1}{2}"
          ]
        },
        {
          text: "Por lo tanto, la solución particular es:",
          math: "y_p = x - \\frac{1}{2x}"
        }
      ]
    },
    {
      title: "4. Solución General",
      content: [
        {
          text: "La solución general es la suma de la homogénea y la particular:",
          math: "y = C_1 + C_2\\ln(x) + x - \\frac{1}{2x}"
        }
      ]
    },
    {
      title: "5. Aplicación de Condiciones Iniciales",
      content: [
        {
          text: "Primera condición: y(1) = 1",
          math: [
            "1 = C_1 + C_2\\ln(1) + 1 - \\frac{1}{2}",
            "1 = C_1 + 1 - \\frac{1}{2}",
            "C_1 = \\frac{1}{2}"
          ]
        },
        {
          text: "Segunda condición: y'(1) = -1/2",
          math: [
            "y' = \\frac{C_2}{x} + 1 + \\frac{1}{2x^2}",
            "-\\frac{1}{2} = C_2 + 1 + \\frac{1}{2}",
            "C_2 = -2"
          ]
        }
      ]
    },
    {
      title: "6. Solución Final",
      content: [
        {
          text: "Sustituyendo las constantes:",
          math: "y = \\frac{1}{2} - 2\\ln(x) + x - \\frac{1}{2x}"
        },
        {
          text: "Simplificando:",
          math: "y = x + \\frac{1}{2} - 2\\ln(x) - \\frac{1}{2x}"
        }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
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
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"x^2y'' + y' = x"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Condiciones Iniciales:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y(1) = 1, \\quad y'(1) = -\\frac{1}{2}"}</BlockMath>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Solución Final:</h3>
              <div className="p-4 rounded-lg flex justify-center">
                <BlockMath>{"y = x + \\frac{1}{2} - 2\\ln(x) - \\frac{1}{2x}"}</BlockMath>
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
          title="Derivada y'(x) con punto inicial y'(1) = -1/2" 
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

export default CauchyEulerSolver;