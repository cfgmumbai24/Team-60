import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Addbeneficiary = () => {

    return (
        <div className="container">
            <h2>Beneficiary Details</h2>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                    <label>Village:</label>
                    <input type="text" className="form-control" id="village" />
                </div>
                <div className="form-group">
                    <label>Goats:</label>
                    <input type="text" className="form-control" id="goats" />
                </div>
                <div className="form-group">
                    <label>Volunteers:</label>
                    <input type="text" className="form-control" id="volunteers" />
                </div>
                <div className="form-group">
                    <label>Certificate Type:</label>
                    <input type="text" className="form-control" id="certificateType" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Addbeneficiary;
