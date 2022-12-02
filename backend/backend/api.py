from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/hello")
def hello(request, name="user"):
    return f"Hello {name}"