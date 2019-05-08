import pandas as pd

df = pd.read_csv("collabusers.csv")

df["createdAt"] = pd.to_datetime(df["createdAt"])

df = df.set_index("createdAt")
df["num"] = 1

df = df["num"]

df = df.groupby(df.index.date).count()

df["cum"] = df.cumsum()
df["cum"].to_json("users.json")