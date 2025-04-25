import React from 'react'
import { Link, useParams } from "react-router";
import './App.css'

function LinkItem({ route, children }) {
    return (
        <Link to={route}>
            {children}
        </Link>
    )
}

export default LinkItem
