//index.js
$(function(){
    
    //declare variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    
    //on page load hide elements we don't need, leave only text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();//pure div ko ek sath hi hide kr dia...iske loye hi div bnaya tha
    $("#result").hide();
    $("#error").hide();
    
    //click on Start Reading
    $("#start").click(function(){
        //get text and split it to words inside an array
        //\s matches spaces, tabs, new lines, etc and + means one or more.
        myArray = $("#userInput").val().split(/\s+/);/*here we used regular expression*/
        
        //get the number of words
        inputLength = myArray.length;
        
        if(inputLength>1){//there is enough input
            
            //move to reading mode
            reading = true;
            
            //hide Start/error/userInput, show New/Pause/Controls
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();
            
            //set progress slider max ye max attribue ko change kia h
            $("#progressslider").attr("max", inputLength-1);
            
            //start the counter at zero
            counter = 0;
            
            //show reading box with the first word
            $("#result").show();
            /*yaha se hum uss div ke andr text bhr rhe hai*/
            $("#result").text(myArray[counter]);
            
            //start reading from the first word..ab hum ek loop krenge jo hr fixed time ke baad execute hoga
            action = setInterval(read, frequency);
            /*read ek fucntion hai jisko hum neeche define krenge*/
            /*frequency means jaise hum speed set kr denge..to yaha se hume interval mil jaega jitne mei hume text change krte rehna hai*/
            
        }else{//not enough text input
            $("#error").show(); 
        }
        
    });
    //Click on New
    $("#new").click(function(){
        //reload page
        location.reload();//ye page reload krne ka function hai
    });
    
    //Click on Pause
    $("#pause").click(function(){
        //stop reading and switch to none reading mode
        clearInterval(action);//yo to obvious hai
        reading = false;
        
        //hide pause and show resume and abhume uski jagah pe resume dikhega
        $("#pause").hide();
        $("#resume").show();
        
    });
    
    //Click on Resume
    $("#resume").click(function(){
        //iss function se jo bhi humne pause ke time pe changes kiye the sbko revert kr denge
        //start reading
        action = setInterval(read, frequency);
        
        //go back to reading mode
        reading = true;
        
        //hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
        
    });
    
    //Change fontSize
    /*jb hum usko silde krte krte ruk jaye tb vo event pura hoga*/
    $("#fontsizeslider").on("slidestop", function(event,ui){/*ye event or ui ka koi kaam nhi hai..lekin jb hum koi event aise likh rhe hi..tb hume ye syntax lihna hu pdta hai*/
        //refresh the slider
        $("#fontsizeslider").slider("refresh");//refresh krenge as ye to krna pdta hai sliders ke sath
        
        //get the value of slider
        var slidervalue = parseInt($("#fontsizeslider").val());
        
        
        $("#result").css("fontSize", slidervalue);
        /*fontsize span hai jaha pe font ki value update hoke lgegi*/
        $("#fontsize").text(slidervalue);
    });
    
    //change speed
    $("#speedslider").on("slidestop", function(event,ui){
        
        //refresh the slider
        $("#speedslider").slider("refresh");
        
        //get the value of slider
        var slidervalue = parseInt($("#speedslider").val());
        
        $("#speed").text(slidervalue);
        
        //stop reading
        clearInterval(action);//as hume interval ki value change krni pdegi to jo abhi reading chl rhi hai usko rok do
        
        //change frequency
        frequency = 60000/slidervalue;
        
        //resume reading if we are in reading mode
        
        //and according to the status of reading ...resume our services with the new interval
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    
    //progress slider
$("#progressslider").on("slidestop", function(event,ui){
        
        //refresh the slider
        $("#progressslider").slider("refresh");
        
        //get the value of slider
        var slidervalue = parseInt($("#progressslider").val());
        
        //stop reading
        clearInterval(action);
        
        //change counter
        counter = slidervalue;
    //jaha ab hume slider jake roka hai..uske correspoding jo vhi counter value hai hume vahi word display krna hai
        //hum chahte to iske neech wale code ke liye fucntion bhi ba skte the as ye baar baar use ho rha hai
        //change word
        $("#result").text(myArray[counter]);    
    
        //change value of progress
        $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
    
        //resume reading if we are in reading mode
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    //functions
    
    function read()
    {
        if(counter == inputLength-1){//last word
            clearInterval(action);/*set interval ka counter part h ye..clearinterval */
            reading = false; //move to non-reading mode
            $("#pause").hide();/*as hume sirf new buttuon dikhega*/
        }
        else
        {
            //counter goes up by one
            counter++;
            
            //get word
            $("#result").text(myArray[counter]);
            
            //change progress slider value and refresh
           
            /*hum slider ka max ek baar fix kr  denge and fir ye slider counter ko dekh ke apne aap apni jagah bna lega*/$("#progressslider").val(counter).slider('refresh');/*and ye tareka hai ki agar slider ki value chnage krni hai to refresh kro usko*/
            
            //change text of percentage
            $("#percentage").text(Math.floor(counter/(inputLength-1)*100));/*ye to obvious calculation hai*/
        }
        
        
        
    }
    
});