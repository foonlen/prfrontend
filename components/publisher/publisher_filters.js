import React from 'react'

function publisher_filters() {
    return (
        <div>
            <div className="orders_filter_row">
                <div className="row">
                  <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8 col-12">
                    <ul className="orders_filters_row_ul">
                      <li><img src="/assets/images/verified_one.png" width="27px"/> <p>Verified</p></li>
                      <li><img src="/assets/images/under_verification.png" /><p>Under Verification</p></li>
                      <li><img src="/assets/images/reject.png" /><p>Rejected</p></li>
                    </ul>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                    <div className="orders_filters_search">
                      <div class="order_search">
                        <div class="input-group">
                          <input type="text" class="form-control" name="search" placeholder="Search" />
                          <div class="input-group-append">
                            <span class="input-group-text"><button type="submit"><img src="/assets/images/search.png" /></button></span>
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

export default publisher_filters
