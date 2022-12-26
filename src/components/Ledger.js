import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Ledger = ({invoice, provider}) => {
    const [BuyerPAN, setBuyerPAN] = useState(0);
    const [Index, setIndex] = useState(0)


    const [message, setmessage] = useState(null);

    const search = async (event) => {
        event.preventDefault();
        // const stat = true
        setmessage("wait till the transaction...")
        
        
        // console.log((await invoice.ledger(BuyerPAN, 0)).toString())
        

        setmessage((await invoice.ledger(BuyerPAN, Index-1)).toString());


    }

    return (

        <Form onSubmit={search}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>BuyerPAN</Form.Label>
                <Form.Control type="" placeholder="Enter PAN" onChange={(event) => {setBuyerPAN(event.target.value); }}/>
        
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Index of the transaction(eg:-1st,2nd,..)</Form.Label>
                <Form.Control type="" placeholder="Enter Index" onChange={(event) => {setIndex(event.target.value); }}/>
        
            </Form.Group>

            
            <Button variant="primary" type="submit" >
                Submit
            </Button>

            <br />
            <br />

            <h3>   {message}</h3>
            <p>(Id, BuyerPAN, SellerPAN, Payment Status, Amount)</p>
        </Form>

    );

}

export default Ledger;