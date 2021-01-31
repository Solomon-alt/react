import { useMemo } from 'react'



export function useComputed(callback, data) {
    return useMemo(callback, data)
}