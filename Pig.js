class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,70,70);
    this.image = loadImage("sprites/flipcat.png");
    this.remove=false;
  }
display()
{
   if((this.body.speed)<5)
   {
      super.display();
   }else
    {
      if(this.remove==false)
      {
      World.remove(world,this.body)  
        score=score+50;
        this.remove=true;
      }  
  }}
};
