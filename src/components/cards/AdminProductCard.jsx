import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  return (
    <Card
      cover={
        <img
          src={product.images && product.images.length ? product.images[0].url : ""}
          style={{height:"150px", objectFit:"cover"}}
          className='p-1'
        />
      }
      actions={[
        <Link to={`/admin/product/${product.slug}`} ><EditOutlined style={{color:"#FF8C00"}} /></Link>,
         <DeleteOutlined onClick={()=> handleRemove(product.slug)} className="text-danger" />
      ]}
    >
      <Meta title={product.title} description={`${product.description && product.description.substring(0, 10)}...`} />
    </Card>
  );
};

export default AdminProductCard;
