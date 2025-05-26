import BeltItems from "./beltItems"

export default function BeltList({rows}:any){
   
    return(
        <div  className="grid gap-2  grid-cols-[repeat(auto-fill,minmax(250px,1fr))]" >
        {rows.map((row)=>(
            <div key={row.id} >
                <BeltItems row={row} />
            </div>
        ))}
        </div>
    )
}