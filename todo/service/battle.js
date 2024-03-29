  // let villain = { atk: 10, hp: 40 };
  // let hero = { atk: 10, hp: 20 };

  let  heroAtk = parseInt(localStorage.getItem('ATK'));
  let  heroHp = parseInt(localStorage.getItem('HP'));

  let villainAtk = parseInt(localStorage.getItem('VATK'));
  let villainHp = parseInt(localStorage.getItem('VHP'));
  


  console.log(villainHp);
  console.log(villainAtk);
  console.log("hero stats down");
  console.log(heroHp);
  console.log(heroAtk);

  function battle() {
    while (villainHp > 0 && heroHp > 0) {
      if (heroHp > 0) {
        villainHp -= heroAtk;
      }
      if (villainHp > 0) {
        heroHp -= villainAtk;
      }
    }

    let result = "";
    if (villainHp <= 0 && heroHp <= 0) {
      result = "Both fighters have fallen!";
    } else if (villainHp <= 0) {
      result = "Hero wins!";
    } else {
      result = "Villain wins!";
    }

 
    console.log(villainHp);
    console.log(villainAtk);
    console.log("hero stats down");
    console.log(heroHp);
    console.log(heroAtk);

  if (heroHp>0) {
    document.querySelector('.heroHp').textContent = heroHp + " HP";
    localStorage.setItem("HP", heroHp.toString());
  } else
    {
      heroHp = 0;
      document.querySelector('.heroHp').textContent = heroHp + " HP";
      localStorage.setItem("HP", heroHp.toString());
    }
    

    document.getElementById('battleResult').textContent = result;
  }



  // console.log(battle());

  
  
    
   // document.querySelector('.villainHp').textContent = villainHp + " HP";

