from rest_framework.views import APIView
from rest_framework.response import Response

class Index(APIView):
    
    def get(self, request, format=None):
        """
            Retun the details of APIs 
        """
        return Response({"message": "Sample API" ,"status":200})