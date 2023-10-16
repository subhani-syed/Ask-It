from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pgvector.django import L2Distance
from django.contrib.auth.models import User
from .models import Embedding,Conversation
from .embedding import get_embedding
from .llm import get_rag
from .serializers import *
import uuid

# Create your views here.

def greet(request):
    return HttpResponse("Hello there!")

@api_view(['GET','POST'])
def upload_pdf(request):
    if request.method == "POST":
        pdf = request.FILES['pdf']
        pdf_name = request.POST['pdf_name']
        user_id  = request.POST['user_id']
        if pdf is not None:
            pdf_reader = PdfReader(pdf)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()

            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size = 512,
                chunk_overlap = 80,
                length_function = len
            )
            chunks = text_splitter.split_text(text)
            
            # Generate a unique Convo_ID
            convo_id = uuid.uuid4()
            Conversation.objects.create(
                convo_id = convo_id,
                convo_name = pdf_name,
                user_id = user_id
            )
            for chunk in chunks:
                # Convert the string into embedding
                embedding = get_embedding(chunk)
                
                # Store the embedding into table along with convo_id
                Embedding.objects.create(
                    uuid = uuid.uuid4(),
                    embedding = embedding,
                    convo_id = convo_id,
                    document = chunk
                )
            print(f"This is the convo id: {convo_id}")
            response = {
                "status":"ok",
                "convo_id":convo_id
            }
        return Response(response)
    
    # /GET not allowed here
    return Response("All good")


@api_view(['POST'])
def ask_query(request):
    if request.method == "POST":
        user_query = request.POST['query']
        convo_id = request.POST['convo_id']
        print(user_query)
        print(convo_id)

        # Convert the user query to embedding
        user_embedding = get_embedding(user_query)

        # Get Similar Docs
        docs = Embedding.objects.filter(convo_id=convo_id).order_by(L2Distance('embedding',user_embedding)).all()[:3]

        # Give the Docs to LLM and Generate Answer
        rag_result = get_rag(docs,user_query)

        response = {
            "status":"ok",
            "result":rag_result
        }
        return Response(response)
    
@api_view(['POST'])
def register_user(request):
    if request.method=='POST':
        username = request.POST['uname']
        mail = request.POST['mail']
        pwd = request.POST['pwd']
        user = User.objects.create_user(username=username,email=mail,password=pwd)
        user.save()
        response = {
            "status" : 200,
            "description":"User Created Successfully"
        }
        return Response(response)


@api_view(['GET','POST'])
def home(request):
    if request.method == 'POST':
        user_id  = request.POST['user_id']
        queryset = Conversation.objects.filter(user_id=user_id).all()
        serialzer = ConversationSerializer(queryset,many=True)
        return Response(serialzer.data)

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            response = {
                "status" : "ok",
                "description" : "User succefully Loged In"
            }
            return Response(response)
        else:
            response = {
                "status" : "not ok",
                "description" : "User not Loged In"
            }
            return Response(response)
        
def logout_user(request):
    logout(request)
    response = {
        "status" : "ok",
        "description" : "User succefully Logged Out"
    }
    return Response(response)

@api_view(['POST'])
def get_details(request):
    if(request.method=='POST'):
        convo_id  = request.POST['convo_id']
        queryset = Conversation.objects.filter(convo_id=convo_id).first()
        serialzer = ConversationSerializer(queryset)
        return Response(serialzer.data)