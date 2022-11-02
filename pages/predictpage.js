import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import {Select, Stepper, Button, NumberInput} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import axios from "axios";
import Confetti from 'react-confetti'
import {useRouter} from "next/router";


const PredictPage = () => {
    const router = useRouter();

    const [pageNumber, setPageNumber] = useState(0);

    //page 1
    const [arrival_date, setArrival_date] = useState();
    const [hotel_type, setHotel_type] = useState();
    const [meal_type, setMeal_type] = useState();
    const [repeated_guest, setRepeated_guest] = useState();
    const [market_segment, setMarket_segment] = useState();
    const [distribution_channel, setDistribution_channel] = useState();
    const [r_room_type, setR_room_type] = useState();
    const [a_room_type, setA_room_type] = useState();
    const [deposit_type, setDeposit_type] = useState();
    const [cus_type, setCus_type] = useState();


    //page 2
    const [staying_days, setStaying_days] = useState();
    const [adults, setAdults] = useState();
    const [children, setChildren] = useState();
    const [babies, setBabies] = useState();
    const [prev_cancel, setPrev_cancel] = useState();
    const [prev_not_cancel, setPrev_not_cancel] = useState();
    const [booking_changes, setBooking_changes] = useState();
    const [car_parking, setCar_parking] = useState();
    const [special_request, setSpecial_request] = useState();
    const [adr, setAdr] = useState();


    useEffect(() => {
        if (arrival_date)
            console.log(arrival_date.toISOString().split('T')[0])
    }, [arrival_date]);

    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    const [cancelState, setCancelState] = useState(null);
    const submitRequest = async () => {


        setLoading(true);
        await axios.post('http://3.95.170.78:8080/predict', {
            arrival_date: arrival_date.toISOString().split('T')[0],
            hotel_type,
            meal_type,
            repeated_guest,
            market_segment,
            distribution_channel,
            r_room_type,
            a_room_type,
            deposit_type,
            cus_type,
            staying_days,
            adults,
            children,
            babies,
            prev_cancel,
            prev_not_cancel,
            booking_changes,
            car_parking,
            special_request,
            adr
        }).then((res) => {
            setCancelState(res.data.Cancelled);
            setLoading(false);
            setFinished(true);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    const reset = async () => {
        await router.reload();
    }


    const [nextPageBtnText, setNextPageBtnText] = useState('Next');
    const handleNextPage = async () => {
        if (pageNumber === 0) { //page 1 to page 2
            setPageNumber(pageNumber + 1);
            setNextPageBtnText('Predict');
        }
        if (pageNumber === 1) { //page 2 to page 3
            if (!arrival_date || !hotel_type || !meal_type || !repeated_guest || !market_segment || !distribution_channel || !r_room_type || !a_room_type || !deposit_type || !cus_type || !staying_days || !adults || !children || !babies || !prev_cancel || !prev_not_cancel || !booking_changes || !car_parking || !special_request || !adr) {
                alert("Please fill all the fields");
                return;
            }


            setPageNumber(pageNumber + 1);
            setNextPageBtnText('Reset');
            await submitRequest();
        }
        if (pageNumber === 2) { //page 3 to page 1
            setNextPageBtnText('Next');
            await reset();
            setPageNumber(0);
        }
    }

    const [prevPageBtnText, setPrevPageBtnText] = useState('Previous');
    const [prevPageDisabledState, setPrevPageDisabledState] = useState(true);
    const handlePrevPage = () => {
        if (pageNumber === 0) {
            setPrevPageDisabledState(true);
        }
        if (pageNumber === 1) { //page 2 to page 1
            setPageNumber(pageNumber - 1);
            setPrevPageDisabledState(false);
        }
        if (pageNumber === 2) { //page 3 to page 2
            setPageNumber(pageNumber - 1);
            setCancelState(null);
            setFinished(false);
            setPrevPageDisabledState(false);
        }
    }


    useEffect(() => {
        if (pageNumber === 0) {
            setPrevPageDisabledState(true);
            setNextPageBtnText('Next');
        }
        if (pageNumber === 1) {
            setPrevPageDisabledState(false);
            setNextPageBtnText('Predict');
        }
        if (pageNumber === 2) {
            setPrevPageDisabledState(false);
            setNextPageBtnText('Reset');
        }

    }, [pageNumber])

    return (
        <Layout>
            {finished && cancelState === 0 && <Confetti/>}
            <div className={``}>
                <div className={``}>
                    <h1>
                        <span className="block text-center text-lg font-semibold text-indigo-600"></span>
                        <span
                            className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            HOTEL BOOKING CANCELLATION PERDITION
                        </span>
                    </h1>
                    <div className={`pt-20`}>
                        <Stepper active={pageNumber} onStepClick={setPageNumber} breakpoint="sm">
                            <Stepper.Step label="First step" description="Dropdowns">
                                <div className={`grid w-full grid-cols-2 gap-3`}>
                                    <div>
                                        <DatePicker
                                            value={arrival_date}
                                            onChange={setArrival_date}
                                            placeholder="Pick date" label="Arrival Date" withAsterisk/>
                                    </div>
                                    <div>
                                        <Select
                                            value={hotel_type}
                                            onChange={setHotel_type}
                                            label="Hotel Type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'City Hotel', label: 'City Hotel'},
                                                {value: 'Resort Hotel', label: 'Resort Hotel'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={meal_type}
                                            onChange={setMeal_type}
                                            label="Meal type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'Bead & Breakfast', label: 'Bead & Breakfast'},
                                                {value: 'Half Board', label: 'Half Board'},
                                                {value: 'Full Board', label: 'Full Board'},
                                                {value: 'Self Catering', label: 'Self Catering'},
                                                {value: 'No Meal Type', label: 'No Meal Type'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={repeated_guest}
                                            onChange={setRepeated_guest}
                                            label="Is Repeated guest"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'Yes', label: 'Yes'},
                                                {value: 'No', label: 'No'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={market_segment}
                                            onChange={setMarket_segment}
                                            label="Market Segment"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'Direct', label: 'Direct'},
                                                {value: 'Corporate', label: 'Corporate'},
                                                {value: 'Online TA', label: 'Online TA'},
                                                {value: 'Offline TA/TO', label: 'Offline TA/TO'},
                                                {value: 'Complementary', label: 'Complementary'},
                                                {value: 'Groups', label: 'Groups'},
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={distribution_channel}
                                            onChange={setDistribution_channel}
                                            label="Distribution Channel"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'Direct', label: 'Direct'},
                                                {value: 'Corporate', label: 'Corporate'},
                                                {value: 'TA/TO', label: 'TA/TO'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={r_room_type}
                                            onChange={setR_room_type}
                                            label="Reserved Room Type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'A', label: 'Type A'},
                                                {value: 'B', label: 'Type B'},
                                                {value: 'C', label: 'Type C'},
                                                {value: 'D', label: 'Type D'},
                                                {value: 'E', label: 'Type E'},
                                                {value: 'F', label: 'Type F'},
                                                {value: 'G', label: 'Type G'},
                                                {value: 'H', label: 'Type H'},
                                                {value: 'L', label: 'Type L'},
                                                {value: 'P', label: 'Type P'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={a_room_type}
                                            onChange={setA_room_type}
                                            label="Assigned Room Type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'A', label: 'Type A'},
                                                {value: 'B', label: 'Type B'},
                                                {value: 'C', label: 'Type C'},
                                                {value: 'D', label: 'Type D'},
                                                {value: 'E', label: 'Type E'},
                                                {value: 'F', label: 'Type F'},
                                                {value: 'G', label: 'Type G'},
                                                {value: 'H', label: 'Type H'},
                                                {value: 'L', label: 'Type L'},
                                                {value: 'P', label: 'Type P'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={deposit_type}
                                            onChange={setDeposit_type}
                                            label="Deposit Type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'No Deposit', label: 'No Deposit'},
                                                {value: 'Non Refund', label: 'Non Refund'},
                                                {value: 'Refundable', label: 'Refundable'}
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            value={cus_type}
                                            onChange={setCus_type}
                                            label="Customer Type"
                                            placeholder="Select type"
                                            data={[
                                                {value: 'Transient', label: 'Transient'},
                                                {value: 'Contract', label: 'Contract'},
                                                {value: 'Transient-Party', label: 'Transient-Party'},
                                                {value: 'Group', label: 'Group'}
                                            ]}
                                        />
                                    </div>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step label="Second step" description="Numbers">
                                <div className={`grid w-full grid-cols-2 gap-3`}>
                                    <div>
                                        <NumberInput
                                            value={staying_days}
                                            onChange={setStaying_days}
                                            number
                                            placeholder="Number of Staying Days"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={adults}
                                            onChange={setAdults}
                                            number
                                            placeholder="Number of Adults"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={children}
                                            onChange={setChildren}
                                            number
                                            placeholder="Number of Children"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={babies}
                                            onChange={setBabies}
                                            number
                                            placeholder="Number of Babies"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={prev_cancel}
                                            onChange={setPrev_cancel}
                                            number
                                            placeholder="Number of Previous Cancellations"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={prev_not_cancel}
                                            onChange={setPrev_not_cancel}
                                            number
                                            placeholder="Number of Previous Not Cancellations"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={booking_changes}
                                            onChange={setBooking_changes}
                                            number
                                            placeholder="Number of Booking Changes"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={car_parking}
                                            onChange={setCar_parking}
                                            number
                                            placeholder="Number of Car Parking Spaces Required"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={special_request}
                                            onChange={setSpecial_request}
                                            number
                                            placeholder="Number of Special Requests"
                                        />
                                    </div>
                                    <div>
                                        <NumberInput
                                            value={adr}
                                            onChange={setAdr}
                                            number
                                            placeholder="ADR"
                                        />
                                    </div>
                                </div>
                            </Stepper.Step>
                            <Stepper.Step
                                allowStepSelect={false}
                                loading={loading}
                                label="Final step" description="Result">
                                <div className={`h-96`}>
                                    {cancelState === 0 &&
                                        <div className="relative">
                                            {/*<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"/>*/}
                                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                                                    <div className="absolute inset-0">
                                                        <img
                                                            className="h-full w-full object-cover object-top"
                                                            src="https://media3.giphy.com/media/4NtpFT4OFdspgpDkrj/giphy.gif?cid=790b76117eb0588586abfbed0b9615ef61f09e53ca326bb9&rid=giphy.gif&ct=g"
                                                            alt="People working on laptops"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-indigo-700 mix-blend-multiply"/>
                                                    </div>
                                                    <div
                                                        className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                                        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                                            <span className="block text-white">Most Probably not Cancelled</span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {cancelState === 1 &&
                                        <div className="relative">
                                            {/*<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"/>*/}
                                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                                <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                                                    <div className="absolute inset-0">
                                                        <img
                                                            className="h-full w-full object-cover object-top"
                                                            src="https://media3.giphy.com/media/IdTUfk4Xr3sEPZVOo8/giphy.gif?cid=790b7611f668b540bb88b9667021dee155eb5ba8b8924821&rid=giphy.gif&ct=g"
                                                            alt="People working on laptops"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-indigo-700 mix-blend-multiply"/>
                                                    </div>
                                                    <div
                                                        className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                                        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                                            <span
                                                                className="block text-white">Most Probably Cancelled</span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </Stepper.Step>
                        </Stepper>
                        <div className={`w-full flex justify-between pt-10`}>
                            <Button
                                disabled={prevPageDisabledState}
                                onClick={handlePrevPage}
                                variant={'outline'}>
                                {prevPageBtnText}
                            </Button>
                            <Button
                                onClick={handleNextPage}
                                variant={'light'}
                                className={`bg-blue-600 text-black`}

                            >
                                {nextPageBtnText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PredictPage;