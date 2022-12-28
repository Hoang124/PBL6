import { useEffect, useRef, useState } from "react";
import React from "react";
import PropTypes from "prop-types";

Paypal.propTypes = {
    Money: PropTypes.number.isRequired,
};
Paypal.defaultProps = {
    Money: 0,
};
function Paypal(props) {
    const money = props.Money;
    console.log('paypal',money);
    const paypalRef = useRef(null);

    useEffect(() => {
        const paypal = window.paypal;

        paypal.Buttons({
            createOrder: (_data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            reference_id: "1",
                            description: "Hello world",
                            amount: {
                                currency_code: "USD",
                                value: money,
                            },
                        },
                    ],
                    application_context: { shipping_preference: "NO_SHIPPING" },
                });
            },
            onApprove: async (_data, actions) => {
                const order = await actions.order?.capture();

                if (order?.status === "COMPLETED") {
                    props.placeOrder()
                }
            },
            onError: (err) => {
                props.setError('Can\'t pay with Paypal')
            },
        })
            .render(paypalRef.current);
    }, [money]);

    return <div className="mt-6" ref={paypalRef} />;
}

export default Paypal;