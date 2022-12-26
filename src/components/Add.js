import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Add = ({invoice, provider}) => {
    const [BuyerPAN, setBuyerPAN] = useState(0);
    const [SellerPAN, setSellerPAN] = useState(0);
    const [Payment, setPayment] = useState(false);
    const [Amount, setAmount] = useState(0);

    const [message, setmessage] = useState(null);

    const add = async (event) => {
        event.preventDefault();
        // const stat = true
        setmessage("wait till the transaction...")
        const signer = await provider.getSigner()
        const transaction = await invoice.connect(signer)
        const msg = await transaction.Entry(BuyerPAN, SellerPAN, Payment, Amount)
        await msg.wait()

        let c = parseInt(await invoice.current_no())

        setmessage(c);


    }

    return (

        <Form onSubmit={add}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>BuyerPAN</Form.Label>
                <Form.Control type="" placeholder="Enter PAN" onChange={(event) => {setBuyerPAN(event.target.value); }}/>
        
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>SellerPAN</Form.Label>
                <Form.Control type="" placeholder="Enter PAN" onChange={(event) => {setSellerPAN(event.target.value); }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Payment Status(true/false)</Form.Label>
                <Form.Control type="" placeholder="Enter" onChange={(event) => {setPayment(event.target.value); }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="" placeholder="Enter amount" onChange={(event) => {setAmount(event.target.value); }}/>
            </Form.Group>

            
            <Button variant="primary" type="submit" >
                Submit
            </Button>

            <br />
            <br />

            <h3>Current id :-  {message}</h3>
        </Form>

    );

}

export default Add;