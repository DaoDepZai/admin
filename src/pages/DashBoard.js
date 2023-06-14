import React, { useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faBurger, faPeopleGroup, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../context/UserContext";
import Nav from "../components/shared/Nav"
import Aside from '../components/shared/Aside';
import { Line } from "react-chartjs-2";
import db from "../db";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)
export default function Dashboard(props) {
    const { state, dispatch } = React.useContext(UserContext);
    useEffect(()=>{
        dispatch({type: "hide_loading"})
    },[])
    const data = {
        labels: state.cart_statis.map(item=>{
            return item.order["contact-time"];
        }),
        datasets: [{
            data: state.cart_statis.map(item=>{
                return parseInt(item.total);
            }),
            backgroundColor: "transparent",
            borderColor: "#f26c6d",
            pointBorderColor: "transparent",
            pointBorderWidth: 4
        }],

    };
    const options = {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                min: 100000,
                max: 10000000,
                ticks: {
                    stepSize: 1000000,
                    callback: (value) => value 
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }
    library.add(faHouse, faBurger, faPeopleGroup, faCircleDollarToSlot);
    
    return (
        <React.Fragment>
            <Nav />
            <Aside></Aside>
            <section class="is-title-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Dashboard</li>
                    </ul>
                </div>
            </section>
            <section class="is-hero-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 class="title">
                        Dashboard
                    </h1>
                </div>
            </section>

            <section class="section main-section">
                <div class="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
                    <div class="card">
                        <div class="card-content">
                            <div class="flex items-center justify-between">
                                <div class="widget-label">
                                    <h3>
                                        Số đơn hàng
                                    </h3>
                                    <h1>
                                        {state.cart.length}
                                    </h1>
                                </div>
                                <span class="icon widget-icon text-green-500"><FontAwesomeIcon icon={faCircleDollarToSlot} style={{ color: "#5ed96c", fontSize: '50' }} /></span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="flex items-center justify-between">
                                <div class="widget-label">
                                    <h3>
                                        Số lượng đặt bàn
                                    </h3>
                                    <h1>
                                        {state.order.length}
                                    </h1>
                                </div>
                                <span class="icon widget-icon text-blue-500"><FontAwesomeIcon icon={faPeopleGroup} style={{ color: "#4e9fb1", fontSize: '50' }} /></span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="flex items-center justify-between">
                                <div class="widget-label">
                                    <h3>
                                        Số sản phẩm
                                    </h3>
                                    <h1>
                                        {state.products.length}
                                    </h1>
                                </div>
                                <span class="icon widget-icon text-red-500"><FontAwesomeIcon icon={faBurger} size="2xl" style={{ color: "#e85e30", fontSize: '50' }} /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-6">
                    <header class="card-header">
                        <p class="card-header-title">
                            <span class="icon"><i class="mdi mdi-finance"></i></span>
                            Thống kê
                        </p>
                        <a href="#" class="card-header-icon">
                            <span class="icon"><i class="mdi mdi-reload"></i></span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="chart-area">
                            <div class="h-full">
                                <div class="chartjs-size-monitor">
                                    <div >
                                        <Line data={data} options={options}></Line>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </React.Fragment>
    )
}