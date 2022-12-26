import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Payment = ({invoice, provider}) => {
    // const [BuyerPAN, setBuyerPAN] = useState(0);
    const [SellerPAN, setSellerPAN] = useState(0);
    const [Payment, setPayment] = useState(false);
    // const [Amount, setAmount] = useState(0);
    const [Id, setId] = useState(0)

    const [message, setmessage] = useState(null);

    const update = async (event) => {
        event.preventDefault();
        // const stat = true
        setmessage("wait till the transaction...")
        const signer = await provider.getSigner()
        const transaction = await invoice.connect(signer)
        const msg = await transaction.Payment(Payment, Id, SellerPAN)
        await msg.wait()

        setmessage("Updated successfully!");


    }

    return (

        <Form onSubmit={update}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>SellerPAN</Form.Label>
                <Form.Control type="" placeholder="Enter PAN" onChange={(event) => {setSellerPAN(event.target.value); }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>New Payment Status(true/false)</Form.Label>
                <Form.Control type="" placeholder="Enter status" onChange={(event) => {setPayment(event.target.value); }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ID</Form.Label>
                <Form.Control type="" placeholder="Enter ID" onChange={(event) => {setId(event.target.value); }}/>
            </Form.Group>

            
            <Button variant="primary" type="submit" >
                Submit
            </Button>

            <br />
            <br />

            <h3>  {message}</h3>
        </Form>

    );

}

export default Payment;