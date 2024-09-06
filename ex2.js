// ให้ออกแบบโจทย์ปัญหา stable matching ที่จับคู่ระหว่าง สถานศึกษา และ ผู้สมัคร
// โดยให้แต่ละสถานศึกษา สามารถรับผู้สมัครได้จำนวนแตกต่างกัน
// และให้ผู้สมัครแต่ละรายสามารถสมัครได้หลายสถาบัน แต่สามารถเข้าศึกษาได้เพียงสถาบันเดียว
// โดยมีเงื่อนไขว่าผู้สมัครสามารถกำหนดเงื่อนไขการเข้าศึกษาต่อแบบเป็นกลุ่มได้ (หมายถึง นาย A
// และนาย B อาจกำหนดเงื่อนไขได้ว่า ทั้งสองคนนี้ จะตัดสินใจไปเข้าศึกษาสถาบัน X
// ก็ต่อเมื่อทั้งสองคนได้รับการคัดเลือกจากทั้งคู่โดยสถาบันนั้นเท่านั้น แต่เงื่อนไขแบบกลุ่มนี้ นาย A
// และนาย B ไม่จำเป็นต้องใช้กับทุกสถาบันก็ได้) จงแสดงวิธีแก้โจทย์ปัญหาที่ได้ออกแบบมา

const group = [
    { name : 1 , members : [ 'a' , 'b'] , university : ['B']},
    { name : 2 , members : ['e' , 'f'] , university : ['D']}
]

const students = [
    {name : 'a' , interested : ['A', 'D', 'B' , 'C'] , groupWith: 1 , accepted : false},
    {name : 'b' , interested : ['A', 'C', 'D' , 'B'] , groupWith: 1, accepted : false},
    {name : 'c' , interested : ['B', 'A', 'D' , 'C'], accepted : false},
    {name : 'd' , interested : ['D', 'B', 'C' , 'A'], accepted : false},
    {name : 'e' , interested : ['D', 'A', 'B' , 'C'] , groupWith: 2, accepted : false},
    {name : 'f' , interested : ['D', 'B', 'C' , 'A'] , groupWith: 2, accepted : false},
    {name : 'g' , interested : ['C', 'B', 'D' , 'A'], accepted : false},
  ];
  
const universities = [
    { name: 'A' ,capacity : 2 , interested : ['b', 'c', 'd' , 'e'] , accept : []},
    { name: 'B' ,capacity : 1 , interested : ['a', 'b', 'c' , 'f'] , accept : []},
    { name: 'C' ,capacity : 3 , interested : ['c', 'd', 'e' , 'a'] , accept : []},
    { name: 'D' ,capacity : 2 , interested : ['f', 'd', 'e' , 'c'] , accept : []}
];

function stableMatching( students , universities){

    const freeStudent = [...students]

    while(freeStudent.length > 0){
        let candidate = freeStudent.shift()
        let candidateGroup = group.find((g)=>g.name === candidate.groupWith)

        if(candidateGroup){
            const groupMembers = students.filter(s => candidateGroup.members.includes(s.name));

            for(let university of candidateGroup.university){
                let selectedUniversity = universities.findIndex((u)=>u.name === university)
                if(universities[selectedUniversity].capacity - universities[selectedUniversity].accept.length >= groupMembers.length){    
                    let members = groupMembers.map((m)=>{
                        return {...m , accepted : true}
                    })
                    universities[selectedUniversity].accept.push(...members)
                }
            }

        }else{
            for(let universityIndex of universities){       
    
                if( universityIndex.capacity > universityIndex.accept.length ){
                    universityIndex.accept.push({...candidate , accepted : true})
                    break;
                }  
    
            }
        }


    }

    return universities
}



const result = stableMatching( students , universities)
console.log(result)