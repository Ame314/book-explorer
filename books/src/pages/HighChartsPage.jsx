import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function HighChartsPage() {
  // 2.2 Definiendo los datos
  const grades = [
    { name: "Amelie", y: 135 },
    { name: "Marc", y: 89 },
    { name: "Andrés", y: 44 },
    { name: "Eliana", y: 32 },
    { name: "Federico", y: 12 }
  ];

  // 2.3 Configuración del gráfico
  const options = {
    title: {
      text: "Students"
    },
    chart: {
      type: "pie"
    },
    series: [
      {
        name: "Notas",
        data: grades
      }
    ]
  };

  // 2.4 Componente principal
  return (
    <div style={{ margin: "40px" }}>
      <h2>Ejercicio 4: HighCharts</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
