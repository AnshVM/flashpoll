export default function Error(props:{err:string}) {
    return(
        <div className='bg-red-500 bg-opacity-10 border-red-500 text-center border p-2 radius rounded-lg text-white'>
           {props.err} 
        </div>
    )
}