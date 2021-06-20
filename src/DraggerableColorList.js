import React from 'react'
import DraggerableColorBoxes from './DraggerableColorBoxes'
import { withStyles } from '@material-ui/core/styles';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';




const DraggerableColorList = SortableContainer(({colors,removeColor})=>{
    return(
        <div style={{height:'100%'}}>
            {colors.map((color,i)=><DraggerableColorBoxes color={color.color}
                    index={i}
                    name={color.name}
                    key={color.name}
                    handleClick={()=>removeColor(color.name)}
                  />)}
        </div>
    )
})

export default DraggerableColorList