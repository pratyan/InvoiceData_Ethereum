//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Invoice {

     address owner;
     uint public current_no; //tracking the invoice serial no.


    // Invoice Data
    struct Data {
        uint serial; //serial No.
        uint BuyerPAN; //buyerPAN
        uint SellerPAN; //sellerPAN
        bool Payment_status; //payment status(paid or not)
        uint Amount; //Invoice Amount
         
    }

    //mapping the buyerPAN to an array of thier transaction
    mapping(uint => Data[]) public ledger;

    //mapping serial no. to BuyerPAN
    mapping(uint => uint) public track_b;

    //mapping serial no. to SellerPAN
    mapping(uint => uint) public track_s;

    constructor(){
        owner = msg.sender;
        current_no = 0; 
    }

    //Invoice DATA entry
    function Entry(uint _buyerPAN, uint _sellerPAN, bool _payment_status, uint _amount) public returns (uint){
        current_no += 1; // updating the serial no

        //Now pushing the new transaction to the array mapped to the buyerPAN
        ledger[_buyerPAN].push(Data({
            serial: current_no,
            BuyerPAN: _buyerPAN,
            SellerPAN: _sellerPAN,
            Payment_status: _payment_status,
            Amount: _amount
        }));

        track_b[current_no] = _buyerPAN; //mapping the buyerPAN to serialNO.
        track_s[current_no] = _sellerPAN; //mapping the sellerPAN to serialNO.
        return current_no;

    }

    // Update payment status
    // only can be done by Seller
    function Payment(bool _newPay, uint _serialNo, uint _sellerPAN) public {
        uint _b = track_b[_serialNo]; // getting the buyerPan by the serialNo
        uint _s = track_s[_serialNo]; //getting the SellerPan by the serialNo

        require( _s == _sellerPAN, "The invoice doesnt match with the sellerPAN"); //cheacking if the serial no match with the sellerPAN
        
        //iterating through the ledger to find the invoice with the given _serialNo
        for (uint p = 0; p < ledger[_b].length; p++) {
            if (ledger[_b][p].serial == _serialNo) {
                ledger[_b][p].Payment_status = _newPay; //updating payment status
            }
        }


    }


    


}

