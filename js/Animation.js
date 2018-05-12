function no_ennemis_en_vue(){
	voitures.forEach((el) => {
		console.log("y : " + el.y);
		if (el.y > 600) return false;
	});
	return true;
}

// Boucle d'animation
// typiquement dans game.js
function animation() {
	if ((!stop_partie)&&(!pause_partie)) {
		ctx.font = "30px Sawasdee";
		ctx.fillStyle = "white";
		cpt_tours ++;

		if (go_fin){
			stop_partie = true;
			console.log("fin");
		}

		if ((nb_voitures_gagnees > 0)&&(missile_lance)){
			nb_voitures_gagnees--;
			missile = new Missile(joueur.x + 15, joueur.y - 50, 0,0, 0, 'red');
			missile.vitesseY = 4;
			missiles.push(missile);
			missile_lance = false;
		}

		switch(cpt_tours){
			case 1000 : niveau=1; frequence_envoi_ennemis -= 20; break;
			case 2500 : niveau=2; frequence_envoi_ennemis -= 20;break;
			case 5000 : niveau=3; frequence_envoi_ennemis -= 20;break;
			case 10000 : niveau=4; frequence_envoi_ennemis -= 20;break;
		}
		if (cpt_tours%5 == 0) score++;
		// 1 on efface
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		var image_route = document.getElementById("route");
		ctx.drawImage(image_route, 0, 0 + cpt, canvas.width, canvas.height);

		var image = document.getElementById("route2");
		ctx.drawImage(image, 0, -canvas.height + cpt, canvas.width, canvas.height);

		if (cpt >= canvas.height - 10){
			cpt = 0;
		}
		else {
			console.log(niveau);
			switch(niveau){
				case 0 : cpt += 6; break;
				case 1 : cpt += 8; break;
				case 2 : cpt += 10; break;
				case 3 : cpt += 14; break;
				case 4 : cpt += 16; break;
			}
			//cpt += 10;
		}

		var rand = Math.floor((Math.random() * frequence_envoi_ennemis) + 1);
		if ((rand % frequence_envoi_ennemis == 0)&&(no_ennemis_en_vue())){
			var r = Math.floor((Math.random() * 4) + 1);
			if (r == 1) x_ennemi = 50;
			else if (r == 2) x_ennemi = 200;
			else if (r == 3) x_ennemi = 370;
			else x_ennemi = 520;
			ennemi1 = new Voiture(x_ennemi, 0, 0, 0, 0, 'black');
			ennemi1.vitesseY = 3;
			voitures.push(ennemi1);
		}

		var rand = Math.floor((Math.random() * frequence_envoi_bonus) + 1);
		if ((rand % frequence_envoi_bonus == 0)&&(no_ennemis_en_vue())){
			var r = Math.floor((Math.random() * 4) + 1);
			if (r == 1) x_bonus = 50;
			else if (r == 2) x_bonus = 200;
			else if (r == 3) x_bonus = 370;
			else x_bonus = 520;
			bonus1 = new Voiture(x_bonus, 0, 0, 0, 0, 'black');
			bonus1.vitesseY = 3;
			voitures_bonus.push(bonus1);
		}

		 voitures.forEach((el) => {
		 	var voiture_ennemie = document.getElementById("voiture_ennemie");
			ctx.drawImage(voiture_ennemie, el.x, el.y, 50,80);
		 })

		 voitures_bonus.forEach((el) => {
		 		var voiture_bonus = document.getElementById("voiture_bonus");
		 		ctx.drawImage(voiture_bonus, el.x,el.y, 70,90);
		 })

		 missiles.forEach((el)=>{
 			var image_missile = document.getElementById("img_missile");
 			ctx.drawImage(image_missile, el.x, el.y, 20, 40);
		 })

		var voiture_bonus_gagnees = document.getElementById("voiture_bonus");
		ctx.drawImage(voiture_bonus_gagnees, 10,10, 40,60);
		ctx.fillText(nb_voitures_gagnees.toString(), 55, 50);

		//ICIIIIIIIIIIIIIIIIIII
		var voiture_rouges_tuees = document.getElementById("voiture_ennemie");
		ctx.drawImage(voiture_rouges_tuees, 20, 80, 25, 40);
		ctx.fillText(nb_voitures_rouges_tuees, 55, 110, 55, 50);

		var voiture_joueur = document.getElementById("voiture_joueur");
		ctx.drawImage(voiture_joueur, joueur.x,joueur.y, 50,80);

		var img_pause = document.getElementById("essai_pause");
		ctx_nv.drawImage(img_pause, 555, 0, 40,40);

		var img_replay = document.getElementById("replay");
		ctx_nv.drawImage(img_replay, 505, -6, 55,55);

	//
	//	ctx.drawImage(missile, missile.x, missile.y, 50,80);


		if (collision){
			var explosion = document.getElementById("explosion");
			ctx.drawImage(explosion, x_explosion, y_explosion, 80,80);
			collision = false;
		}
		var n = 500;
		ctx.fillText("Score", 500,30);
		if (score < 10) n = 530;
		else if ((score >= 10)&&(score < 100)) n = 520;
		else if ((score >= 100)&&(score < 1000)) n = 510;
		else if ((score >= 1000)&&(score < 10000)) n = 500;
		else if ((score >= 10000)&&(score < 100000)) n = 495;
		else n = 475;
		ctx.fillText(score.toString(), n, 60);

		var img_heart, img_heart2, img_heart3;
		//HEARTS
		if (nb_vies >= 2){img_heart2 = document.getElementById("heart");ctx.drawImage(img_heart2, 525,80, 30,40);}
		else {img_heart2 = document.getElementById("heart_empty");ctx.drawImage(img_heart2, 525,76, 30,47);}

		if (nb_vies >= 3){img_heart3 = document.getElementById("heart");	ctx.drawImage(img_heart3, 555,80, 30,40);}
		else {img_heart3 = document.getElementById("heart_empty");	ctx.drawImage(img_heart3, 555,76, 30,47);}

		if (nb_vies >= 1){img_heart = document.getElementById("heart");ctx.drawImage(img_heart, 495,80, 30,40);}
		else {img_heart = document.getElementById("heart_empty");ctx.drawImage(img_heart, 495,76, 30,47);}





		//ctx_nv.font = "20px Sawasdee";
		//ctx_nv.fillText("Nv. " + niveau, 10, 10);

		// 2 on dessine et on deplace
		dessineEtDeplaceLesObjets();

		// 3 on teste les collisions
		testeCollisions();

	}
	else {
		mediaElement.pause();
	}
	// 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);
}
