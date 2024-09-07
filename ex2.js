/* ให้ออกแบบโจทย์ปัญหา stable matching ที่จับคู่ระหว่าง สถานศึกษา และ ผู้สมัคร
โดยให้แต่ละสถานศึกษา สามารถรับผู้สมัครได้จำนวนแตกต่างกัน
และให้ผู้สมัครแต่ละรายสามารถสมัครได้หลายสถาบัน แต่สามารถเข้าศึกษาได้เพียงสถาบันเดียว
โดยมีเงื่อนไขว่าผู้สมัครสามารถกำหนดเงื่อนไขการเข้าศึกษาต่อแบบเป็นกลุ่มได้ (หมายถึง นาย A
และนาย B อาจกำหนดเงื่อนไขได้ว่า ทั้งสองคนนี้ จะตัดสินใจไปเข้าศึกษาสถาบัน X
ก็ต่อเมื่อทั้งสองคนได้รับการคัดเลือกจากทั้งคู่โดยสถาบันนั้นเท่านั้น แต่เงื่อนไขแบบกลุ่มนี้ นาย A
และนาย B ไม่จำเป็นต้องใช้กับทุกสถาบันก็ได้) จงแสดงวิธีแก้โจทย์ปัญหาที่ได้ออกแบบมา */


// Student variable storage group
const group = [
    { name : 1 , members : [ 'a' , 'b' ] , university : [ 'B','D' ]},
    { name : 2 , members : [ 'e' , 'f' , 'g' ] , university : [ 'D','C' ]}
]

// Student lists variable storage
const students = [
    {name : 'a' , interested : ['A', 'D', 'B' , 'C'] , groupWith: 1},
    {name : 'b' , interested : ['A', 'C' , 'B' ,'D'] , groupWith: 1},
    {name : 'c' , interested : ['B', 'A', 'D' , 'C'] , groupWith: null},
    {name : 'd' , interested : ['D', 'B', 'C' , 'A'] , groupWith: null},
    {name : 'e' , interested : ['D', 'A', 'B' , 'C'] , groupWith: 2},
    {name : 'f' , interested : ['D', 'B', 'C' , 'A'] , groupWith: 2},
    {name : 'g' , interested : ['C', 'B', 'D' , 'A'] , groupWith: 2},
];

// University lists variable storage
const universities = [
    { universityName: 'A' ,capacity : 2 , interested : ['b', 'c', 'd' , 'e' ,'a'] , accept : []},
    { universityName: 'B' ,capacity : 1 , interested : ['a', 'b', 'c' , 'f'] , accept : []},
    { universityName: 'C' ,capacity : 3 , interested : ['c', 'd', 'e' , 'a' , 'g' , 'f'] , accept : []},
    { universityName: 'D' ,capacity : 2 , interested : ['f', 'd', 'e' , 'c'] , accept : []}
];

function stableMatching( students , universities){

    const freeStudent = [...students] // copy value students
    
    while(freeStudent.length > 0){
        let candidate = freeStudent.shift() // Pick candidate
        let candidateGroup = group.find((g)=>g.name === candidate.groupWith) // find candidate group

        // If candidate has a group
        if(candidateGroup){

            const groupMembers = students.filter(s => candidateGroup.members.includes(s.name)) // find group members

            // Loop every university is student interested  
            for(let university of candidateGroup.university){
                
                // find university index in universities array
                let selectedUniversity = universities.findIndex((u)=>u.universityName === university) 

                // find currant student in currant university has accept 
                let IsAccept = universities[selectedUniversity].accept.find((n)=>n === candidate.name)
                
                // If this candidate has accepted given skip
                if(IsAccept){
                    break
                }

                // Condition : If university free position more than number of group members
                if(universities[selectedUniversity].capacity - universities[selectedUniversity].accept.length >= groupMembers.length){   
                        
                    // every student in group can 
                    let interestedAllMembers = groupMembers.every((m) => universities[selectedUniversity].interested.includes(m.name) )
                        
                    // add all group members on this university
                    if(interestedAllMembers){    
                        let arrayMember = groupMembers.map((m)=> m.name)
                        universities[selectedUniversity].accept.push(...arrayMember)
                        break // Next student
                    }else{
                        // If group not match return candidate to free student with group == null
                        freeStudent.push({
                            ...candidate , groupWith : null
                        })
                    }

                }
            }

        }else{

            // Loop every university 
            for(let university of candidate.interested){   
                let universityIndex = universities.findIndex(u => u.universityName === university); 
                
                // check free position in university
                if(universities[universityIndex].capacity > universities[universityIndex].accept.length){

                    // check match student with university
                    if(candidate.interested.includes(universities[universityIndex].universityName) || universities[universityIndex].interested.includes(candidate.name) ){

                        universities[universityIndex].accept.push(candidate.name)
                        break; // If match next student

                    }

                }
        
            }

        }

    }

    return universities // return university with accept student 
}



const result = stableMatching( students , universities)
console.log(result)