---
layout: post
title: "Caching Data in Spring Using Redis"
date: 2014-12-18
categories: [java, redis]
---

[Caching](http://en.wikipedia.org/wiki/Cache_%28computing%29) is a way for applications to store data so that future requests to the same data are returned faster and do not require repeating computationally expensive operations. The [Spring Framework](http://projects.spring.io/spring-framework/) provides a simple way to cache the results of method calls with little to no configuration.

The examples in this post use Spring 4.1.3 and [Spring Data Redis](http://projects.spring.io/spring-data-redis/) 1.4.1, the latest versions at the time of this writing. Full source code for this post can be found [here](https://github.com/caseyscarborough/spring-redis-caching-example).

## Installing Dependencies

You'll need to install the `spring-data-redis` and `jedis` plugins. Add the following to your `pom.xml` file in your Spring project if you're using Maven:

```xml
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-redis</artifactId>
    <version>1.4.1.RELEASE</version>
</dependency>

<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.6.1</version>
</dependency>
```

If you're using Gradle, you can add the following to your `build.gradle` file:

```java
compile "org.springframework.data:spring-data-redis:1.4.1.RELEASE"
compile "redis.clients:jedis:2.6.1"
```

## Enabling Cache Support in Your Spring Application

To enable support for caching in your application, you'll want to create a new `CacheManager` bean. There are many different implementations of the `CacheManager` interface, but for this post we'll be using `RedisCacheManager` to allow integration with [Redis](http://redis.io/).

### Java-based Configuration

If you're using Java-based configuration, you'll want to annotate one of your configuration classes with the `@EnableCaching` annotation and expose a `CacheManager` bean. You'll also need a connection factory and a `RedisTemplate` bean for Spring to communicate with your Redis database. An example `CacheConfig` class is shown below:

```java
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
@EnableCaching
public class CacheConfig {

  @Bean
  public JedisConnectionFactory redisConnectionFactory() {
    JedisConnectionFactory redisConnectionFactory = new JedisConnectionFactory();

    // Defaults
    redisConnectionFactory.setHostName("127.0.0.1");
    redisConnectionFactory.setPort(6379);
    return redisConnectionFactory;
  }

  @Bean
  public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory cf) {
    RedisTemplate<String, String> redisTemplate = new RedisTemplate<String, String>();
    redisTemplate.setConnectionFactory(cf);
    return redisTemplate;
  }

  @Bean
  public CacheManager cacheManager(RedisTemplate redisTemplate) {
    RedisCacheManager cacheManager = new RedisCacheManager(redisTemplate);

    // Number of seconds before expiration. Defaults to unlimited (0)
    cacheManager.setDefaultExpiration(300);
    return cacheManager;
  }
}
```

## Caching the Results of a Method

After setting up your caching configuration, you can then begin to start caching method results with the `@Cacheable` annotation. Putting this annotation on a method will cause it's results to be cached in your Redis database for the length specified in your expiration, or until it is manually expired.

See the following example:

```java
import org.apache.log4j.Logger;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ExampleController {

  private static final Logger log = Logger.getLogger(ExampleController.class);

  @RequestMapping(value = "/", method = RequestMethod.GET)
  @ResponseBody
  @Cacheable("calculateResult")
  public String calculateResult() {
    log.debug("Performing expensive calculation...");
    // perform computationally expensive calculation
    return "result";
  }
}
```

Executing this method multiple times causes only one log output:

```
2014-12-18 19:24:30 DEBUG ExampleController:19 - Performing expensive calculation...
```

And you can see the cached item in your Redis instance:

![](/assets/images/redis-caching.png)

## Updating and Evicting Cached Data

In addition to the `@Cacheable` annotation, Spring provides the `@CachePut` and `@CacheEvict` annotations for manually managing cached data. The `@CachePut` annotation allows you to update the cache without interfering with the execution of the method. For example, if you updated a user, you would want to place the result into the cache to be looked up later:

```java
@CachePut(value = 'user', key = "#id")
public User updateUser(Long id, UserDescriptor descriptor)
```

This method will always be executed and its results stored in your cache.

On the other hand, there will be times where you will want to 'evict' data from your cache, that is, to remove it. For example, when deleting a user:

```java
@CacheEvict(value = 'user', key = "#id")
public void deleteUser(Long id)
```

## Conclusion

This is a simple example of how to cache application data in your Redis instance. Although this post focuses on caching with Redis, caching with other providers is very straight forward and the caching concepts remain the same. For more information and complete documentation, see [Spring's caching reference](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/cache.html). Feel free to leave a comment if you have any questions or run into any problems.

