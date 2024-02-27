import React from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";

const ShopCard = ({item}) => {
    // const item = {
    //     "brand": null,
    //     "id": "9f2722a8-dac6-4f71-b877-1731d30ae6db",
    //     "price": 8500.0,
    //     "product": "Золотое кольцо с бриллиантами и изумрудом"
    // }
    return (
        <Card style={{margin:"10px 0"}}>
            <Card.Body>
                <Card.Title>{item.product}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.brand}</Card.Subtitle>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>id: {item.id}</ListGroup.Item>
                <ListGroup.Item>price: {item.price}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default ShopCard;