import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchItemsByPages,
    selectItemsArray, selectItemsError,
    selectItemsLoading
} from "../../store/slices/shopItems";
import ShopCard from "./ShopCard";
import {fetchItemsIDByPages} from "../../HTTPRequests/fetchItems";
import {changeError, selectError} from "../../store/slices/error";

const Catalog = () => {
    const [itemsID, setItemsID] = useState([])
    const items = useSelector(selectItemsArray)
    const isLoading = useSelector(selectItemsLoading)
    const fetchErrorItems = useSelector(selectItemsError)
    const error = useSelector(selectError)
    const dispatch = useDispatch()


    function getItemsId(id = 0, error = null) {
        if (!id) {
            fetchItemsIDByPages(1, 50).then(data => {
                setItemsID(data.result)
            }).catch((e) => {
                console.log(e.code)
                getItemsId(1)
            })
        } else {
            fetchItemsIDByPages(1, 50).then(data => {
                setItemsID(data.result)
            }).catch((e) => {
                dispatch(changeError(e.code))
                console.log(e.code + " Перезагрузите страницу")
            })
        }
    }

    function getItems() {

    }

    useEffect(() => {
        getItemsId()
    }, [])
    useEffect(() => {
        dispatch(fetchItemsByPages({itemsIDArray: itemsID}))
    }, [dispatch, itemsID]);


    if (isLoading) {
        return "Ждите"
    }
    if (fetchErrorItems) {
        return `${fetchErrorItems}`
    }
    return (
        <div>
            <Row md={4}>
                <>
                    {items.map(item => (
                        <Col><ShopCard item={item}/></Col>
                    ))}
                </>
            </Row>
        </div>
    );
};

export default Catalog;