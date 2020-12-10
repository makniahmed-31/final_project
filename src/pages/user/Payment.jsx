import React from "react";
import { CreditCardTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Payment = () => {
  return (
    <div className="row m-5 p-3">
      <div className="col-md-6">
        <hr />
        <h4 className="text-center">Payment Info</h4>
        <hr />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MLRbsB5hAvUKBYZbDOKOZ-0PouGU1vWj5w&usqp=CAU"
          height='100px'
        />
      </div>
      <div className="col-md-6">
        <hr />
        <h4 className="text-center">Credit Card</h4>
        <hr />
        <Input
          size="large"
          placeholder="Credit Card Number"
          prefix={<CreditCardTwoTone />}
        />
      </div>
    </div>
  );
};

export default Payment;
