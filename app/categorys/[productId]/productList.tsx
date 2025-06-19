export default function ProductList({row}:any){
    return(
        <>
        <img src={row.image} />
        <p>{row.name}</p>
        </>
    )
}