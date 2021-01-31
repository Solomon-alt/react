import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../store/actions/data/data'

const Reports = () => {
    let dispatch = useDispatch()
    let data = useSelector(state => state.data.data)
    useEffect(() => {
        dispatch(getData())
    }, [])
    return (
        <div>
            <div id="myChart" style={{ width: '1200px', height: '500px' }}></div>
        </div>
    )
}
export default Reports