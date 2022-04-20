const KEYS ={
    patients:'patients',
    patientId:'patientId'
}


export const getMutuelleCollection = () => ([
    { id:'CNSS', title:'CNSS'},
    { id:'FAR', title:'FAR'},
    { id:'Autres', title:'Autres'},
])


export function insertPatient(data){
    let patients = getAllPatients();
    data['id']= generatePatientId();
    patients.push(data);
    localStorage.setItem(KEYS.patients,JSON.stringify(patients))
}

export function updatePatient(data) {
    let patients = getAllPatients();
    let recordIndex = patients.findIndex(x => x.id == data.id);
    patients[recordIndex] = { ...data }
    localStorage.setItem(KEYS.patients, JSON.stringify(patients));
}

export function deletePatient(id) {
    let patients = getAllPatients();
    patients = patients.filter(x => x.id != id)
    localStorage.setItem(KEYS.patients, JSON.stringify(patients));
}

export function generatePatientId(){
    if(localStorage.getItem(KEYS.patientId)==null)
        localStorage.setItem(KEYS.patientId, '0')
    var id = parseInt(localStorage.getItem(KEYS.patientId))
    localStorage.setItem(KEYS.patientId, (++id).toString())
    return id;
}

export function getAllPatients(){
    if(localStorage.getItem(KEYS.patients)==null)
        localStorage.setItem(KEYS.patients, JSON.stringify([]))
    return  JSON.parse(localStorage.getItem(KEYS.patients));
    //map mutuelleId to mutuelle title
    //let mutuelles = getMutuelleCollection();
   // return patients.map(x=>({
    //    ...x,
    //    mutuelle : mutuelles[x.mutuelle-1].title
    //}))
}