
#!/usr/bin/python3
import re
freguesias = open("freg.csv")
output = open("output.ttl","w")
head = "###  http://prc2018.di.uminho.pt/mapa#"
body = " rdf:type owl:NamedIndividual, :Freguesia ;"
def trataFreguesia(nome,distr,conc):
	final=[]
	final.append(head)
	final.append(nome)
	final.append("\n:"+nome)
	final.append(body)
	teste="\n:nome \"" +nome+"\";\n:nomeDistr \""+distr+"\";\n:concelho \""+conc+"\".\n"
	final.append(teste)
	return "".join(final)

for line in freguesias:
	line=re.sub(r'"','',line)
	dicofre=line.split(",")
	nomeFreg=dicofre[3]
	distrFreg=dicofre[1]
	concFreg=dicofre[2]
	nomeFreg=trataFreguesia(nomeFreg,distrFreg,concFreg)
	output.write(nomeFreg)
