import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const PiChart = ({ usersTotal, productsTotal, ordersTotal, allOrders }) => {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getTotal();
  }, [allOrders]);

  const getTotal = () => {
    setRevenue(
      allOrders.reduce((value, nextValue) => {
        return value + nextValue.cartTotal;
      }, 0)
    );
  };

  const data = [
    { name: "Products", value: productsTotal, fill: "#4643e3" },
    { name: "Revenue", value: revenue, fill: "#33b87a" },
    { name: "Users", value: usersTotal, fill: "#f32950" },
    { name: "Orders", value: ordersTotal, fill: "#fa6e22" },
  ];

  return (
    <div className=" text-center">
      {/* <h3>Dynamical Data</h3> */}
      <div className="piechart container-fluid">
        <PieChart width={400} height={400}>
          <Pie
            dataKey={"value"}
            isAnimationActive={true}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          isAnimationActive={true}
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default PiChart;
