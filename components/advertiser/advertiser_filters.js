import React from 'react'

function advertiser_filters() {
    return (
        <div>
            <div className="orders_filter_row">
                <div className="row">
                  <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8 col-12">
                    <ul className="orders_filters_row_ul">
                      <li><img src="/assets/images/progress_order.png" width="27px"/> <p>Pending Approved</p></li>
                      <li><img src="/assets/images/tab_new_order.png" /><p>Hiring People</p></li>
                      <li><img src="/assets/images/work_process.png" width="27px" /><p>Work Process</p></li>
                      <li><img src="/assets/images/tab_completed.png" /><p>Completed</p></li>
                      <li><img src="/assets/images/reject.png" /><p>Rejected</p></li>
                    </ul>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                    <div className="orders_filters_search">
                      <div className="order_search">
                        <div className="input-group">
                          <input type="text" className="form-control" name="search" placeholder="Search" />
                          <div className="input-group-append">
                            <span className="input-group-text"><button type="submit"><img src="/assets/images/search.png" /></button></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>
    )
}

export default advertiser_filters
