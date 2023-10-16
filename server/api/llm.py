from langchain import HuggingFaceHub
from langchain.chains.question_answering import load_qa_chain
from langchain.schema.document import Document

def get_rag(docs,query):

    doc_list = []
    for doc in docs:
        doc_list.append(Document(page_content=doc.document))

    llm = HuggingFaceHub(repo_id="google/flan-t5-large", model_kwargs={"temperature": 0, "max_length": 512})
    chain = load_qa_chain(llm, chain_type="stuff")
    response = chain.run(input_documents=doc_list, question=query)
    
    print(f"RAG response is : {response}")
    
    return response