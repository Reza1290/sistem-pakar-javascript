const sakit = [
		[0,1,2,3,9], //20,21,22,23,29
    [0,1,2,4,10], //20,21,22,24,30
    [0,1,2,5,6,9], //20,21,22,25,26,29
    [1,7,11], //21,27,31
    [8,2,5,12] //28,22,25,32
]

const gejala =[
    [1,2,4,5],
    [4,5,6],
    [4,7],
    [4,8,9],
    [8,10],
    [4,5,9,11],
    [4,8,11,12],
    [4,13],
    [1,2,3,4],
    [14,15],
    [14,16],
    [14,17],
    [18,19]
]

const txtgejala = [
    "1. Sering mengalami buang air besar (> 2 kali)?",
    "2. Mengalami berak encer?",
    "3. Mengalami berak berdarah?",
    "4. Merasa lesu dan tidak bergairah?",
    "5. Tidak selera makan?",
    "6. Merasa mual dan sering muntah (lebih dari 1 kali) ?",
    "7. Merasa sakit di bagian perut ?",
    "8. Tekanan darah anda rendah ?",
    "9. Anda merasa pusing ?",
    "10. Anda mengalami pingsan ?",
    "11. Suhu badan anda tinggi ?",
    "12. Mengalami luka di bagian tertentu ?",
    "13. Tidak dapat menggerakkan anggota badan tertentu ?",
    "14. Pernah memakan sesuatu ?",
    "15. Memakan daging ?",
    "16. Memakan jamur ?",
    "17. Memakan makanan kaleng ?",
    "18. Membeli susu ?",
    "19. Meminum susu ?"
]

const penyakit=[
    "Staphylococcus aureus",
    "Jamur beracun",
    "Salmonellae",
    "Clostridium botulinum",
    "Campylobacter"
]

var treshold = 0
var checked = [0]

const thresholdChange = (e) => {
	
	treshold = e
  diagnose()
  
}

const handleClik = (e) => {
	let index = checked.indexOf(e)
   if(index <= -1){
    checked.push(e)
   }else{
    checked.splice(index,1)
   }
  checkGejala()
}

var gejalaPersen = [

]

var persen = []

var result = []

const checkGejala = () => {

	for(let i = 0; i < gejala.length; i++){
    gejalaPersen[i] = []
    persen[i] = 0
  	for(let j=0; j < gejala[i].length; j++ ){
    	if(checked.includes(gejala[i][j])){
      	gejalaPersen[i][j] = (1/gejala[i].length)
        persen[i] = persen[i] + (1/gejala[i].length)        
      }else{
        gejalaPersen[i][j] = 0
      }
      //console.log(gejalaPersen)
    }
  }
   diagnose()
  
}

const diagnose = () => {
	for(let i = 0; i < sakit.length; i++){
  result[i] = 0
  	for(let j = 0; j < sakit[i].length; j++){
    		
      	result[i] = result[i] + (persen[sakit[i][j]] * (1/sakit[i].length))
        console.log(result)
    }
  }
  	$('#result').empty()
  	$('#final').empty()
    
	  $.each(result,function(index,value){
	    $('#result').append(
	      `<div> ${penyakit[index] } : ${Math.round(value * 100)} % </div>
	    `)
      if(value * 100 > treshold){
      $('#final').append(
	      `<div> ${penyakit[index] } </div>
      
      `)
      }
	  })
    
    
}

$(function(){
	$.each(txtgejala,function(index,value){
		$('#placeholder').append(
    `<div class="q">
      <input id="q${index}" onclick="handleClik(${index+1})" name="c[]" value="${index}" type="checkbox" >
      <label for="q${index}" style="width:100%">${value}</label>
    </div>
    `)})
})
