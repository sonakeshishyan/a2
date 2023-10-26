text = 'Just completed a 5.12 km run @Runkeeper'


index1 = text.index("a")
index2 = text.index("run")
secondHalf = text.split('@Runkeeper')
sentence = secondHalf[0].strip() 
number = sentence[index1:index2]

if (number.strip().find("km")):
    math = number.strip().split("km")
    math2 = math[0].split("a")
    mile = float(math2[1].strip()) / 1.609
    print(mile)
 
else:
    math = number.strip().split("mi")
    math2 = math[0].split("a")
    mile1 = float(math2[1].strip())
    print(mile1)
