import React from 'react'

function orders_progress({ order_accept_status }) {
    return (
        <div className="settings__containers">
            <div className="overview__item single_over_item">
                <div className="overview__row align-baseline percent_over_item">
                    <div className="overview__col">
                        <div className="overview__content"><span className="dot green_dot"></span></div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content"><span className="dot green_dot"></span></div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content"><span className="dot green_dot"></span></div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content"><span className="dot green_dot"></span></div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content"><span className="dot green_dot"></span></div>
                    </div>
                </div>
                <div className="overview__progress progress">
                    {
                        parseInt(order_accept_status) === 5
                            ?
                            <div className="progress__value bg-green-raw" style={{ width: '25%' }} />
                            :
                            parseInt(order_accept_status) === 7
                                ?
                                <div className="progress__value bg-green-raw" style={{ width: '50%' }} />
                                :
                                parseInt(order_accept_status) === 9
                                    ?
                                    <div className="progress__value bg-green-raw" style={{ width: '75%' }} />
                                    :
                                    parseInt(order_accept_status) === 10
                                        ?
                                        <div className="progress__value bg-green-raw" style={{ width: '100%' }} />
                                        :
                                        parseInt(order_accept_status) === 11
                                            ?
                                            <div className="progress__value bg-green-raw" style={{ width: '75%' }} />
                                            :
                                            null
                    }
                </div>
                <div className="overview__row align-baseline">
                    <div className="overview__col">
                        <div className="overview__content ">Created On </div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content">Discussion </div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content">On work</div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content">Review</div>
                    </div>
                    <div className="overview__col">
                        <div className="overview__content">Completed</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default orders_progress