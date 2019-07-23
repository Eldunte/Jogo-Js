$(document).ready(function() {
    $("#tiro").hide();
	$("#explosao1").hide();
	$("#explosao2").hide();
});
var score=0;
var jogadorEnergia=3;
var podeAtirar=true;
var velocidade=5;
var posicaoY1 = parseInt(Math.random() * 410);
var posicaoY2 = parseInt(Math.random() * 410);

var TECLA = {
	W: 87,
	S: 83,
	D: 68
}

var jogo = {};
jogo.pressionou = [];

$(function(){
	jogo.timer = setInterval(loop,30);
	
	//SOM E MUSICA
	var somTiro=document.getElementById('somTiro');
	var somExplosao=document.getElementById('somExplosao');
	var gameover = document.getElementById("gameover");
	
	var musica = document.getElementById("musica");
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();
    
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function(e){
    	jogo.pressionou[e.which] = false;
	});
});

function loop()
{
	moveJogador();
	moveFundo();
	moveInimigo1();
	moveInimigo2();
	colisao();
	energia();
	pontos();

}

function moveJogador() {

if (jogo.pressionou[TECLA.W])
	{
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-10);
		
		if (topo<=0) {
		
		$("#jogador").css("top",topo+10);
		
		}
		
		
	}
	
	if (jogo.pressionou[TECLA.S])
	{
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);

    if (topo>=410) {
		
		$("#jogador").css("top",topo-10);
		
		}		

		
	}
	
	if (jogo.pressionou[TECLA.D])
	{
		
		//Chama função Tiro	
		tiro();
	}
}

function moveFundo() {
	
	posicao = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",posicao-1);
		
}

function moveInimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX-velocidade);
		$("#inimigo1").css("top",posicaoY1);
		
		if (posicaoX<=0) {
			
			posicaoY1 = parseInt(Math.random() * 410);
			$("#inimigo1").css("left",617);
			$("#inimigo1").css("top",posicaoY1);
			
		}
		
}

function moveInimigo2() {

        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-velocidade);
		$("#inimigo2").css("top",posicaoY2);
		
		if (posicaoX<=0) {
			
			posicaoY2 = parseInt(Math.random() * 410);
			$("#inimigo2").css("left",617);
			$("#inimigo2").css("top",posicaoY2);
			
		}
		
}

function tiro() {

	if (podeAtirar==true) {
	
	podeAtirar=false;
	somTiro.play();
	topo = parseInt($("#jogador").css("top"))
	posicaoX= parseInt($("#jogador").css("left"))
	tiroX = posicaoX + 80;
	topoTiro=topo+30;
	$("#tiro").show();
	$("#tiro").css("top",topoTiro);
	$("#tiro").css("left",tiroX);
	
	var tempoTiro=window.setInterval(executaTiro, 30);
	
	}
 
    function executaTiro() {
		posicaoX = parseInt($("#tiro").css("left"));
	    $("#tiro").css("left",posicaoX+25); 

        if (posicaoX>650) {
						
			window.clearInterval(tempoTiro);
			tempoTiro=null;
			$("#tiro").hide();
			podeAtirar=true;
					
        }
}
}
function colisao() {

var jogadorX = parseInt($("#jogador").css("left"))+parseInt($("#jogador").css("width"));
var jogadorBaixo = parseInt($("#jogador").css("top"))+parseInt($("#jogador").css("height"))+50;
var jogadorTopo = parseInt($("#jogador").css("top"));

var inimigo1X = parseInt($("#inimigo1").css("left"));
var inimigo1Baixo = parseInt($("#inimigo1").css("top"))+parseInt($("#inimigo1").css("height"));
var inimigo1Topo = parseInt($("#inimigo1").css("top"));

var inimigo2X = parseInt($("#inimigo2").css("left"))
var inimigo2Baixo = parseInt($("#inimigo2").css("top"))+parseInt($("#inimigo2").css("height"));
var inimigo2Topo = parseInt($("#inimigo2").css("top"));	

var tiroX = parseInt($("#tiro").css("left"))+parseInt($("#tiro").css("width"));
var tiroBaixo = parseInt($("#tiro").css("top"))+parseInt($("#tiro").css("height"));
var tiroTopo = parseInt($("#tiro").css("top"));

//Identificar  colisão Inimigo1 com o Jogador

if (inimigo1X <= jogadorX) {
		
		if (inimigo1Baixo <= jogadorBaixo && inimigo1Baixo >= jogadorTopo)
			{
		$("#inimigo1").css("left",617);
		posicaoY1 = parseInt(Math.random() * 410);
		$("#inimigo1").css("top",posicaoY1);
		
		explosao1(inimigo1X,inimigo1Topo);
		jogadorEnergia--;
		

		} 
			
	}
	
//Identificar  colisão Inimigo2 com o Jogador

if (inimigo2X <= jogadorX) {
		
		if (inimigo2Baixo <= jogadorBaixo && inimigo2Baixo >= jogadorTopo)
			{
		$("#inimigo2").css("left",617);
		posicaoY2 = parseInt(Math.random() * 410);
		$("#inimigo2").css("top",posicaoY2);
		
		explosao2(inimigo2X,inimigo2Topo);
		jogadorEnergia--;
		
		} 
			
	}

//Identifica  Colisão Tiro com o inimigo1

if (tiroX >= inimigo1X) {
	
		if (tiroBaixo <= inimigo1Baixo && tiroBaixo >= inimigo1Topo)
		   {
		$("#inimigo1").css("left",617);
		posicaoY1 = parseInt(Math.random() * 410);
		$("#inimigo1").css("top",posicaoY1);
		score=score+100;
		velocidade=velocidade+0.3;
		}
	}
	
//Identifica a colisão Tiro com o inimigo2

if (tiroX >= inimigo2X) {
	
		if (tiroBaixo <= inimigo2Baixo && tiroBaixo >= inimigo2Topo)
		   {
		$("#inimigo2").css("left",617);
		posicaoY2 = parseInt(Math.random() * 410);
		$("#inimigo2").css("top",posicaoY1);
		score=score+100;
		velocidade=velocidade+0.3;
		}
	}
	
}

function explosao1(inimigo1X,inimigo1Topo) {
	somExplosao.play();
	var div=$("#explosao1");
	div.css("top", inimigo1Topo);
	div.css("left", inimigo1X);
	div.show();
	div.animate({width:200, height:100, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(resetaExplosao, 1000);
	
	function resetaExplosao() {
		div.css("width", 100);
		div.css("height",100);
		div.css("opacity", 100);
		div.hide();
		window.clearInterval(tempoExplosao);
		tempoExplosao=null;
		
	}
		
}

function explosao2(inimigo2X,inimigo2Topo) {
	somExplosao.play();
	var div=$("#explosao2");
	div.css("top", inimigo2Topo);
	div.css("left", inimigo2X);
	div.show();
	div.animate({width:200, height:100, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(resetaExplosao, 1000);
	
	function resetaExplosao() {
		div.css("width", 100);
		div.css("height",100);
		div.css("opacity", 100);
		div.hide();
		window.clearInterval(tempoExplosao);
		tempoExplosao=null;
		
	}
		
}
//Diminuir a energia.

function energia() {
	
	if (jogadorEnergia==3) {
		
		$("#energia").css("background-image", "url(img/energia_3.png)");
	}
	
	if (jogadorEnergia==2) {
		
		$("#energia").css("background-image", "url(img/energia_2.png)");
	}
	
	if (jogadorEnergia==1) {
		
		$("#energia").css("background-image", "url(img/energia_1.png)");
	}
	
	if (jogadorEnergia==0) {
		
		$("#energia").css("background-image", "url(img/energia_0.png)");
		
		//Fim de Jogo
	}
	
	
}
function pontos() {
	$("#placar").html("<h1> Score: " + score + "</h1>");
}
