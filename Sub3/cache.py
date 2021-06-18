import os
import time
from datetime import datetime, date, timedelta 
import sys
import csv
import re
import shutil
import uuid
import re
from flask import Flask, request, session, render_template, redirect, make_response, url_for, json, jsonify
import config
import pymongo
from bson.objectid import ObjectId
from threading import Timer
# from apscheduler.schedulers.background import BackgroundScheduler


""" Demonstrating Flask, using APScheduler. """

"""
Mock Cache LRU program uses a double linked-list for fast insertion/deletion of cache values,
along with keeping track of 'LRU order.' The program also uses a dictionary to 'hash map' key/vals
for the fast lookup of values. As lookup is slow in a linked-list, and insertion/deletion 
is slower in a hashmap, the program uses best of both worlds; a linked-list, and hash-map 
for a smooth LRU cache. 
"""

app = Flask(__name__)
app.config.from_object('config.Development')


client = pymongo.MongoClient('localhost:27017')
db = client['lru']
perm = db['perm']
cache = db['cache']

def manage_db():
	# loop through collection names
	for col in db.list_collection_names():
		# Select the date of origin segment baked into the collection name when created
		result = re.search('\.(.*)\.', col)
		time_existed = int(time.time() - int(result.group(1)))

		if time_existed > 120:
			print(col)
			print('dropped')
			cur = db.get_collection(col)
			cur.drop()
			
class RepeatTimer(Timer):
		def run(self):
			while not self.finished.wait(self.interval):
				print('running')
				self.function(*self.args, **self.kwargs)

today = datetime.today()
noon = today.replace(day=today.day, hour=12, minute=0, second=0, microsecond=0) + timedelta(days=3)
wait = (noon - today).total_seconds()
secs = 60

timer = RepeatTimer(wait, manage_db)
timer.start()


# timer.cancel()
#==============

def fib(n):
	try:
		n = int(n)
	except:
		print('fib exception has occurred')
		return
	if n == 0:
		return "zero"
	if n == 1:
		return 0
	if n == 2 or n == 3:
		return 1
	else:
		return fib(n - 1) + fib(n - 2)


def send_cache(collection):
	# if collection.find_one({'_id': 'linked-list'}):
	l_list = collection.find_one({'_id': 'linked-list'})
	address = l_list['head']
	cache_data = []
	while address:
		results = collection.find_one({'_id': address})
		cache_data.append({'key': results['key'], 'val': results['value']})
		address = results['nex']
	return cache_data

def identify_user(cache_manager=False):
	# Check if session key exists
	if session:
		print('hello')
		print(session)
		if session.get('id'):
			print('id')
			# Loop through collection names
			for col in db.list_collection_names():
					# Check if session id exists as a collection name
					if session['id'] == col:
						print('session already exists') 
						# return existing session id as the continued session id
						return {'exists': True, 'id': col}
	# If no session id recognized and when program has received entry from user, id is assigned and returned to cache_manager function
	if cache_manager:
			print('session doesnt exist')
			new_id = str(uuid.uuid4()) + "." + str(time.time())
			session['id'] = new_id
			return {'exists': False, 'id': new_id}
	# if unidentified user/ip adress (no session) has accessed home page. Session id and DB collection isn't created until first entry received
	else:
		return {'exists': False, 'id': False}

@app.route('/')
def home():
	session.permanent = True
	user = identify_user()
	print('user')
	print(user)
	
	# user_id = request.cookies.get('YourSessionCookie')
	response = make_response(render_template('index.html'))
	response.set_cookie(key='YourSessionCookie', value='something', max_age=(1000*60*60*24)*3, secure=False, httponly=True, samesite='Lax')
	# response.delete_cookie('YourSessionCookie')
	# return response
	if user['exists']:
		session['id'] = user['id']
		collection = db[session['id']]
		cache = send_cache(collection)
		return render_template('index.html', cache=cache)
	else:
		# return render_template('index.html')
		return response
		

def add_first_link(collection, arg):
	fib_val = fib(arg)
	collection.insert(
	{
		'key': arg,
		'value': fib_val,
		'nex': None,
		'prev': None
	})
	return fib_val

def build_cache(collection, arg):
	new_node = collection.find_one({'key': arg})#####
	address = new_node['_id']
	
	collection.insert_many(
		[
			{
				'_id': 'linked-list',
				'head': address,
				'tail': address
			},
			{
				'_id': 'hashmap', 
				arg: address
			}
		])

def check_arg_exist(h_map, arg):
	exists = False
	# Check if key (arg) already exists in cache by looping (extracting value) in cursor object of h_map
	for extract in h_map:
		#loop through a list of extracted value's keys
		for i in list(extract.keys()):
			print(i)
			if i == arg:
				exists = True
				print('It exists')
	return exists

def swap_link(collection, arg, count):
	l_list = collection.find_one({'_id': 'linked-list'})
	next_node = l_list['head']
	swap = prev = nex = ""
	condition = None
	for i in range(count - 2):
		cur = collection.find_one({'_id': next_node})
		if cur['key'] == arg:
			swap = cur['_id']
			nex = cur['nex']
			prev = cur['prev']
			condition = i
			print('swap')
			print(swap)
			break
		else:
			next_node = cur['nex']
	print(swap)
	print(nex)
	print(prev)

	collection.update({'_id': prev},
		{
			"$set": { 'nex': nex }
		})
	# what if this is None?
	if nex:
		collection.update({'_id': nex},
			{
				"$set": {'prev': prev}
			})

	collection.update({'_id': swap},
		{
			"$set": {
						'prev': None,
						'nex': l_list['head']
					}
		})
	collection.update({'_id': l_list['head']},
		{
			"$set": {
						'prev': swap
					}
		})

	# If the document is the last node in linked-list
	if nex == None:
		print('Lets do it')
		collection.update({'_id': 'linked-list'},
			{
				"$set": {
							'head': swap,
							'tail': prev
						}
			})
		collection.update({'_id': prev},
			{
				"$set": {'nex': None }
			})

	else:
		print('cmon', swap)
		collection.update({'_id': 'linked-list'},
			{
				"$set": {'head': swap}
			})
	if condition > 0:
		condition += 1
	return condition

def add_link(collection, arg):
	l_list = collection.find_one({'_id': 'linked-list'})
	collection.insert(
		{
			'key': arg,
			'value': fib(arg),
			'nex': l_list['head'],
			'prev': None
		})
	new_node = collection.find_one({'key': arg}) ######
	address = new_node['_id']
	print('address is')
	print(address)
	
	# Update the was 1st doc/node, which is now 2nd node's 'prev' value to point towards the new first (new arg) document/node
	collection.update({'_id': l_list['head']},
		{
			"$set": {'prev': address}
		})
	
	# Update the l_list head and hashmap to point at the new document/node
	collection.update({'_id': 'linked-list'},
		{
			"$set": {'head': address}
		})
	collection.update({'_id': 'hashmap'},
		{
			"$set": {arg: address}
		})
	
# Remove LRU node
def del_LRU(collection, arg):
	# Get last node in linked-list (l_list)
	l_list = collection.find_one({'_id': 'linked-list'})
	last = collection.find_one({'_id': l_list['tail']})
	
	# Remove corresponding hashmap value from hashmap doc
	collection.update({'_id': 'hashmap'},
		{
			"$unset": {last['key']: last['value']}
		})
	# Get the second-to-last node id
	next_last = collection.find_one({'_id': last['prev']})
	collection.update({'_id': next_last['_id']}, 
		{
			"$set": {'nex': None}
		})

	#delete last node
	collection.delete_one({'_id': l_list['tail']})
	collection.update({'_id': 'linked-list'},
		{
			"$set": {'tail': next_last['_id']}
		})

def get_fib(collection, arg):
	h_map = collection.find_one({'_id': 'hashmap'})
	arg = str(arg)
	get_node = collection.find_one({'_id': h_map[arg]})
	return get_node['value']

def clear_cache(arg):
	db.drop_collection(session['id'])
	result = json.dumps({'key': arg, 'value': None, 'condition': None, 'count': None, 'exists': None })
	print('cache is being cleared')
	return result


@app.route('/check', methods=['POST'])
def	cache_manager():

	session.permanent = True
	# Check if session id is in database
	status = identify_user(True)
	session['id'] = status['id']
	# this value is used as a saftey in case cache is emptied while old values for old cache are still present on the site (front-end)
	user_exists = status['exists']	# Set collection to corresponding session in use
	collection = db[session['id']]
	print(session['id'])
	# Receive value from front end
	arg = request.get_data().decode('UTF-8')
	if arg == None:
		return

	if arg == "c" or arg == "C":
		print('lets call clear cache')
		return clear_cache(arg)
	# Check the number of existing key/val pairs
	results = collection.find({})
	count = results.count()

	condition = None
	fib_val = None

	# If new user build cache (hashmap linked-list)
	if count == 0:
		# add first link (document)
		fib_val = add_first_link(collection, arg)
		# creates foundation of cache db data structure (linked-list head/tail and hashmap dictionary) 
		build_cache(collection, arg)
		condition = 1
	
	# If user exists, check if submitted argument exists already or not	
	else:
		h_map = collection.find({'_id': 'hashmap'})
		arg_exists = check_arg_exist(h_map, arg)

		# If arg exists, is us the head value of the linked-list? (The most recently used), do nothing, otherwise swap
		if arg_exists:
			l_list = collection.find_one({'_id': 'linked-list'})
			head = collection.find_one({'_id': l_list['head']})
			# Is not head?
			if not head['key'] == arg:
				condition = swap_link(collection, arg, count)
			# Else it is the head, no condition needed	
			else:
				condition = None

		# Arg value does not exist in 'cache', insert it, if cache is full, delete LRU document	
		else:
			add_link(collection, arg)
			if count >= 6:
				del_LRU(collection,arg)
				condition = 5
			else:
				count -= 2

	if count <= 3:
		 condition = 1
	
	if not fib_val:
		fib_val = get_fib(collection, arg)
	# Print cache to terminal	
	every = collection.find({})
	for ever in every:
		print(ever)
	result = json.dumps({'key': arg, 'value': fib_val, 'condition': condition, 'count': count, 'exists': user_exists })
	return result

if __name__ == '__main__':
	app.run(debug=True)


# I have to manage an animation condition, and return arg (key) w/ value


