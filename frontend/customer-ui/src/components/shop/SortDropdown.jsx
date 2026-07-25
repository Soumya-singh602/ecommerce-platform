export default function SortDropdown({
    setOrdering
}) {


return (

<select

className="
border rounded-lg px-4 py-2
"

defaultValue=""

onChange={(e)=>{

    setOrdering(e.target.value);

}}

>


<option value="">
Sort By
</option>


<option value="price">
Price: Low to High
</option>


<option value="-price">
Price: High to Low
</option>


</select>

);

}