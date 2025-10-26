
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
import os
# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)


# Initialize messages with a system message
system = SystemMessage(content="you are a question answer generator in which user give the paragraph and you generate the question and answer from it without paragraph you can't generate and give short info to tell the user to give paragraph")
messages = [system]

@app.route('/api', methods=['POST'])
def chat():



    my_api_key = os.getenv("api_key") 

    if not my_api_key:
        raise ValueError("API key environment variable not set")
    
    #Get the user input from the POST request
    model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", 
    google_api_key=my_api_key, 
    temperature=float(request.headers.get('temperature', 0.5)),
    top_p=float(request.headers.get('top_p', 0.9)),
    )
    






    #taking the values from the header
    #body of request
    user_input = request.json.get('message')
    quesnumber = request.json.get('quesNumber', 5)
    questype = request.json.get('questype', 'mcq')
    quesdiffi = request.json.get('queslevel', 'medium')
    


    print(quesdiffi)
    print(questype)

    print(quesnumber)


    
    if questype == 'mcq':
        modelinput = f"Generate {quesnumber} multiple-choice questions related to the topic: '{user_input}'. which have difficulty {quesdiffi} Each question should have the following format: {{ 'question': 'The question text', 'answer': 'The correct answer', 'options': ['Option 1', 'Option 2', 'Option 3', 'Option 4'] }}. Return the result as a JSON formate  of question objects."
    elif questype == 'trueFalse':
        modelinput = f"Generate {quesnumber} true/false questions related to the topic: '{user_input}'.  which have difficulty {quesdiffi} Each question should have the following format: {{ 'question': 'The question text', 'answer': 'True' or 'False' }}. Return the result as a JSON formate  of question objects."
    elif questype == 'shortAnswer':
        modelinput = f"Generate {quesnumber} simple  Theory  questions answer related to the topic: '{user_input}'.  which have difficulty {quesdiffi}  Each question should have the following format: {{ 'question': 'The question text', 'answer': 'The correct answer' }}. Return the result as a JSON formate  of question objects."
    elif questype == 'longAnswer':
        modelinput = f"Generate {quesnumber} long answer questions related to the topic: '{user_input}'. which have difficulty {quesdiffi} Each answer have 50 words answer  Each question should have the following format: {{ 'question': 'The question text', 'answer': 'The correct answer' }}. Return the result as a JSON formate of question objects.at last must"


   

    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    
  
    # Append user input to the messages list
    messages.append(HumanMessage(content=modelinput))


    # Generate response from the model
    try:
        result = model.invoke(messages)
        ai_response = result.content
        ai_response = ai_response.replace('json', '').strip()
        print(ai_response)


        word = "```"
        if word in ai_response :
            ai_response = ai_response.replace("```", '').strip()
        
            
        

        main_response= ''
        main_response = ai_response

        print(main_response)
        main_response = json.loads(main_response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    # Append AI response to the messages
    messages.append(AIMessage(content=main_response))
    
    # Return the AI response to the 
    
   
    return jsonify({"response": main_response})

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
