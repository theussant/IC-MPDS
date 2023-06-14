# Script to call a Python Script every 30 minutes.
# Remember to give permission to the script. 
#(chmod+x).
# Loop to correctly execute the function.
#!/bin/bash
while :
do

if [ $# -eq 0 ]
    then
        echo "Running file..."
fi

# Python.
   python3 receive_image.py

# Calculation for the loop to be done every 30 minutes.
sleep $((30*60))

done

# Path.
#~/Codes/gitclones/cv-pipeline/script$ 

# End