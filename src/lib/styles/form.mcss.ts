const form = 'rel flex flex:col'
const field = 'flex_.field flex:col_.field p:20_.field fg:yellow-70_.field'
const label = 'cursor:pointer_.field_label f:bold_.field_label'
const invalid = 'p:10|5_.invalid fg:red-60_.invalid bg:red-60_.field_input.invalid b:3|solid|red_.field_input.invalid fg:gray-5_.field_input.invalid'
const input = `p:6_.field_input w:full_.field_input r:3_.field_input bg:gray-20_.field_input b:2|solid|gray-30_.field_input 
b:2|solid|yellow-70_.field_input:hover   f:bold_.field_input outline:2|solid|yellow-70_.field_input:focus` //my:10_.field_input
const textarea = `p:6_.field_textarea w:full_.field_textarea r:3_.field_textarea bg:gray-20_.field_textarea b:2|solid|gray-30_.field_textarea 
b:2|solid|yellow-70_.field_textarea:hover    f:bold_.field_textarea resize:vertical_.field_textarea outline:2|solid|yellow-70_.field_textarea:focus` // my:10_.field_textarea

export const mcssForm = `${form} ${field} ${label} ${invalid} ${input} ${textarea}`.replace(/\s\s+/g, ' ').trim()
