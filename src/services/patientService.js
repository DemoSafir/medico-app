const KEYS ={
    patients:'patients',
    patientsId:'patientsId'
}


export const getMutuelleCollection = () => ([
    { id:'1', title:'CNSS'},
    { id:'2', title:'FAR'},
    { id:'3', title:'Autres'},
])


export function insertPatient(data){
    let patients = getAllPatients();
    data['id']= generatePatientId();
    patients.push(data);
    localStorage.setItem(KEYS.patients,JSON.stringify(patients))
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
    let patients = JSON.parse(localStorage.getItem(KEYS.patients));
    //map mutuelleId to mutuelle title
    let mutuelles = getMutuelleCollection();
    return patients.map(x=>({
        ...x,
        mutuelle : mutuelles[x.mutuelle-1].title
    }))
}

